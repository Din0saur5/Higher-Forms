import { createClient } from "npm:@supabase/supabase-js@2";

const accountId = Deno.env.get("CLOUDFLARE_ACCOUNT_ID");
const bucketName = Deno.env.get("R2_BUCKET_NAME");
const accessKeyId = Deno.env.get("R2_ACCESS_KEY_ID");
const secretAccessKey = Deno.env.get("R2_SECRET_ACCESS_KEY");
const publicBaseUrl = Deno.env.get("R2_PUBLIC_BASE_URL");
const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? Deno.env.get("VITE_URL") ?? "";
const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY") ?? Deno.env.get("VITE_ANON") ?? "";

const encoder = new TextEncoder();
const region = "auto";
const service = "s3";
const signingAlgorithm = "AWS4-HMAC-SHA256";

const imageExtensionByMime: Record<string, string> = {
  "image/avif": "avif",
  "image/gif": "gif",
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

const allowedExtensions = new Set(Object.values(imageExtensionByMime));
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      ...corsHeaders,
      "Content-Type": "application/json",
    },
  });

const createHttpError = (status: number, message: string) => ({ status, message });

const ensureConfigured = () => {
  if (!accountId || !bucketName || !accessKeyId || !secretAccessKey || !publicBaseUrl) {
    throw createHttpError(500, "Missing Cloudflare R2 configuration.");
  }

  if (!supabaseUrl || !supabaseAnonKey) {
    throw createHttpError(500, "Missing Supabase configuration.");
  }
};

const toHex = (buffer: ArrayBuffer) =>
  Array.from(new Uint8Array(buffer))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");

const sha256Hex = async (value: string) => {
  const hash = await crypto.subtle.digest("SHA-256", encoder.encode(value));
  return toHex(hash);
};

const hmac = async (keyData: string | ArrayBuffer, value: string) => {
  const key = typeof keyData === "string" ? encoder.encode(keyData) : keyData;
  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    key,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );

  return crypto.subtle.sign("HMAC", cryptoKey, encoder.encode(value));
};

const getSignatureKey = async (secretKey: string, dateStamp: string) => {
  const kDate = await hmac(`AWS4${secretKey}`, dateStamp);
  const kRegion = await hmac(kDate, region);
  const kService = await hmac(kRegion, service);
  return hmac(kService, "aws4_request");
};

const buildQueryString = (entries: Array<[string, string]>) =>
  entries
    .sort((a, b) => {
      const keyComparison = a[0].localeCompare(b[0]);
      return keyComparison !== 0 ? keyComparison : a[1].localeCompare(b[1]);
    })
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join("&");

const signUrl = async (
  method: string,
  key: string,
  expiresInSeconds = 300,
  queryEntries: Array<[string, string]> = [],
) => {
  ensureConfigured();

  const host = `${accountId}.r2.cloudflarestorage.com`;
  const apiBaseUrl = `https://${host}`;
  const amzDate = new Date().toISOString().replace(/[:-]|\.\d{3}/g, "");
  const dateStamp = amzDate.slice(0, 8);
  const credentialScope = `${dateStamp}/${region}/${service}/aws4_request`;
  const canonicalUri = key ? `/${bucketName}/${key}` : `/${bucketName}`;
  const canonicalHeaders = `host:${host}\n`;
  const signedHeaders = "host";
  const payloadHash = "UNSIGNED-PAYLOAD";
  const requestQueryEntries: Array<[string, string]> = [
    ...queryEntries,
    ["X-Amz-Algorithm", signingAlgorithm],
    ["X-Amz-Credential", `${accessKeyId}/${credentialScope}`],
    ["X-Amz-Date", amzDate],
    ["X-Amz-Expires", String(expiresInSeconds)],
    ["X-Amz-SignedHeaders", signedHeaders],
  ];
  const canonicalQueryString = buildQueryString(requestQueryEntries);
  const canonicalRequest = [
    method,
    encodeURI(canonicalUri),
    canonicalQueryString,
    canonicalHeaders,
    signedHeaders,
    payloadHash,
  ].join("\n");
  const stringToSign = [
    signingAlgorithm,
    amzDate,
    credentialScope,
    await sha256Hex(canonicalRequest),
  ].join("\n");
  const signingKey = await getSignatureKey(secretAccessKey!, dateStamp);
  const signature = toHex(await hmac(signingKey, stringToSign));
  const signedQuery = `${canonicalQueryString}&X-Amz-Signature=${signature}`;

  return {
    url: `${apiBaseUrl}${encodeURI(canonicalUri)}?${signedQuery}`,
    expiresAt: new Date(Date.now() + expiresInSeconds * 1000).toISOString(),
  };
};

const decodeXmlEntities = (value: string) =>
  value
    .replaceAll("&amp;", "&")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&quot;", '"')
    .replaceAll("&#39;", "'");

const parseListKeys = (xml: string) =>
  Array.from(xml.matchAll(/<Key>(.*?)<\/Key>/g), (match) => decodeXmlEntities(match[1]));

const listObjectsByPrefix = async (prefix: string) => {
  const { url } = await signUrl("GET", "", 60, [
    ["list-type", "2"],
    ["prefix", prefix],
  ]);
  const response = await fetch(url, { method: "GET" });

  if (!response.ok) {
    throw createHttpError(500, `Failed to list R2 objects for prefix "${prefix}".`);
  }

  return parseListKeys(await response.text());
};

const deleteObject = async (key: string) => {
  const { url } = await signUrl("DELETE", key, 60);
  const response = await fetch(url, { method: "DELETE" });

  if (!response.ok) {
    throw createHttpError(500, `Failed to delete R2 object "${key}".`);
  }
};

const cleanupAvatarObjects = async (userId: string, currentKey: string) => {
  const prefixes = [`${userId}.`, `${userId}-`];
  const foundKeys = new Set<string>();

  for (const prefix of prefixes) {
    const keys = await listObjectsByPrefix(prefix);
    keys.forEach((key) => foundKeys.add(key));
  }

  const staleKeys = Array.from(foundKeys).filter((key) => key !== currentKey);

  for (const staleKey of staleKeys) {
    await deleteObject(staleKey);
  }

  return staleKeys;
};

const getExtensionFromFileName = (fileName = "") => {
  const parts = fileName.toLowerCase().split(".");
  return parts.length > 1 ? parts.pop() ?? null : null;
};

const resolveImageExtension = (fileName?: string, contentType?: string) => {
  if (contentType && imageExtensionByMime[contentType]) {
    return imageExtensionByMime[contentType];
  }

  const fileExtension = getExtensionFromFileName(fileName);
  return fileExtension && allowedExtensions.has(fileExtension) ? fileExtension : null;
};

const buildPublicObjectUrl = (key: string) =>
  `${publicBaseUrl!.replace(/\/+$/, "")}/${encodeURI(key)}`;

const getUser = async (req: Request) => {
  ensureConfigured();

  const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
    global: {
      headers: {
        Authorization: req.headers.get("Authorization") ?? "",
      },
    },
  });

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    throw createHttpError(401, "Unauthorized.");
  }

  return user;
};

const handleSign = async (body: { fileName?: string; contentType?: string }, userId: string) => {
  const extension = resolveImageExtension(body.fileName, body.contentType);

  if (!extension) {
    throw createHttpError(400, "Only PNG, JPG, WEBP, GIF, and AVIF profile images are supported.");
  }

  const objectKey = `${userId}.${extension}`;
  const { url, expiresAt } = await signUrl("PUT", objectKey, 300);

  return {
    success: true,
    uploadUrl: url,
    avatarUrl: buildPublicObjectUrl(objectKey),
    objectKey,
    expiresAt,
  };
};

const handleFinalize = async (body: { objectKey?: string }, userId: string) => {
  const currentKey = body.objectKey;

  if (!currentKey || !currentKey.startsWith(`${userId}.`)) {
    throw createHttpError(400, "Invalid avatar object key.");
  }

  const deletedKeys = await cleanupAvatarObjects(userId, currentKey);

  return {
    success: true,
    deletedKeys,
  };
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return json({ success: false, message: "Method not allowed." }, 405);
  }

  try {
    const body = await req.json();
    const user = await getUser(req);

    if (body.action === "sign") {
      return json(await handleSign(body, user.id));
    }

    if (body.action === "finalize") {
      return json(await handleFinalize(body, user.id));
    }

    return json({ success: false, message: "Unsupported profile picture action." }, 400);
  } catch (error) {
    if (error && typeof error === "object" && "status" in error && "message" in error) {
      return json({ success: false, message: error.message }, error.status as number);
    }

    console.error("Profile picture function error:", error);
    return json({ success: false, message: "Profile picture request failed." }, 500);
  }
});
