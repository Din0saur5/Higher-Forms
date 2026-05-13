const PUBLIC_ASSET_BASE_URL =
  import.meta.env.VITE_PUBLIC_ASSET_BASE_URL ||
  "https://pub-4311852694e24094a7ad235f566e9848.r2.dev";

export const assetUrl = (path = "") => {
  const normalizedBase = PUBLIC_ASSET_BASE_URL.replace(/\/+$/, "");
  const normalizedPath = path.replace(/^\/+/, "");

  return `${normalizedBase}/${normalizedPath}`;
};
