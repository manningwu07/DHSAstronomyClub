import Head from "next/head";
import LandingPage from "./LandingPage";

export default function Home() {
  return (
    <>
      <Head>
        <title>AstroGaels</title>
        <meta name="description" content="The Dublin High School Astronomy Club" />
        <link rel="icon" href="/logo.jpg" />

        <meta name="keywords" content="DHS, Dublin High School, Astronomy, Astro, Dublin CA, High School, Club" />
        <meta name="author" content="DHS Astronomy Club, Manning Wu" />

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
