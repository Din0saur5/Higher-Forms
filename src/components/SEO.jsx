import React from "react";
import { Helmet } from "react-helmet-async";

const SITE_URL = "https://www.higher-forms.com";
const DEFAULT_TITLE = "Higher Forms | Premium Ceramic Vape Experiences";
const DEFAULT_DESCRIPTION =
  "Higher Forms delivers premium Duo-Flare™ devices and ceramic core cartridges engineered for pure, consistent vapor and bold strain flavor.";
const DEFAULT_IMAGE =
  "https://mlxvwhdswsfgelvuxicb.supabase.co/storage/v1/object/public/web-assets/Small/Hero800.png";

const SEO = ({
  title,
  description = DEFAULT_DESCRIPTION,
  path = "/",
  image = DEFAULT_IMAGE,
  type = "website",
  robots,
}) => {
  const fullTitle = title ? `${title} | Higher Forms` : DEFAULT_TITLE;
  const url = `${SITE_URL}${path}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {robots && <meta name="robots" content={robots} />}

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="Higher Forms" />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* PWA/Branding helpers */}
      <meta name="theme-color" content="#0b0b0b" />
    </Helmet>
  );
};

export default SEO;
