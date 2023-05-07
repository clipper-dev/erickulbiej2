import Footer from "../components/nav/Footer";
import Navbar from "../components/nav/Navbar";
import { menu } from "../data/menu";
import "./globals.css";

export const metadata = {
  title: "Eric Kulbiej - Frontend Developer, Researcher, and Seafarer",
  description:
    'Eric Kulbiej is a freelance frontend developer, researcher, and seafarer with a flair for productivity. Merchant navy officer on a passenger ferry and the creator of the popular "Post Productive."',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={metadata.description} />
        <meta name="author" content="Eric Kulbiej" />
        <meta
          name="keywords"
          content="Eric Kulbiej, Frontend Developer, Researcher, Writer"
        />
        <link rel="icon" href="/logo512.png" />
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.erickulbiej.com" />
        <meta
          property="og:image"
          content="https://www.erickulbiej.com/images/og-image.jpg"
        />

        {/* Twitter tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metadata.title} />
        <meta name="twitter:description" content={metadata.description} />
        <meta name="twitter:url" content="https://www.erickulbiej.com" />
        <meta
          name="twitter:image"
          content="https://www.erickulbiej.com/images/twitter-image.jpg"
        />

        <title>{metadata.title}</title>
      </head>
      <body>
        <nav>
          <Navbar data={menu} />
        </nav>
        {children}
        <Footer />
      </body>
    </html>
  );
}
