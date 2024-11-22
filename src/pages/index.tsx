import Head from "next/head";
import LandingPage from "./LandingPage";

export default function Home() {
  return (
    <>
      <Head>
        <title>AstroGaels</title>
        <meta name="description" content="Dublin High School Astronomy Club" />
        <link rel="icon" href="/logo.jpg" />

        {/* Open Graph Meta Tags for Social Media */}
        <meta property="og:title" content="AstroGaels" />
        <meta
          property="og:description"
          content="Dublin High School Astronomy Club"
        />
        <meta property="og:image" content="/logo.jpg" />
        <meta property="og:url" content="https://dhsastronomy.netlify.app" />

        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="AstroGaels" />
        <meta
          name="twitter:description"
          content="Dublin High School Astronomy Club"
        />
        <meta name="twitter:image" content="/logo.jpg" />

        {/* Google Site Verification --- publishes the site to Google Search */}
        <meta
          name="google-site-verification"
          content="A6YrIHHiVDJIA8O5_fVIFMNVm8W7lxnVZd6TYIy5w4Q"
        />
      </Head>
      <LandingPage />
    </>
  );
}
