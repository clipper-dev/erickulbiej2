import { Metadata } from "next";
import { Toaster } from "sonner";
import { Navbar } from "@/components/nav/Navbar";
import Footer from "@/components/nav/Footer";
import GoogleAnalytics from "./GoogleAnalytics";
import "./globals.css";

export const metadata: Metadata = {
  title: "Eric Kulbiej - Maritime Officer and Web Engineer",
  description: "Seafarer who codes. Merchant navy officer on a passenger ferry, web dev engineer, and productivity enthusiast.",
  keywords: ["Eric Kulbiej", "Maritime Officer", "Web Engineer", "Frontend Developer", "Merchant Navy", "Passenger Ferry", "Productivity"],
  authors: [{ name: "Eric Kulbiej" }],
  creator: "Eric Kulbiej",
  publisher: "Eric Kulbiej",
  metadataBase: new URL("https://www.erickulbiej.com"),
  openGraph: {
    title: "Eric Kulbiej - Maritime Officer and Web Engineer",
    description: "Seafarer who codes. Merchant navy officer on a passenger ferry, web dev engineer, and productivity enthusiast.",
    url: "https://www.erickulbiej.com",
    siteName: "Eric Kulbiej",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Eric Kulbiej - Maritime Officer and Web Engineer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Eric Kulbiej - Maritime Officer and Web Engineer",
    description: "Seafarer who codes. Merchant navy officer on a passenger ferry, web dev engineer, and productivity enthusiast.",
    images: ["/images/twitter-image.jpg"],
    creator: "@erickulbiej", // Add your Twitter handle if you have one
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://www.erickulbiej.com",
  },
  icons: {
    icon: "/logo512.png",
    shortcut: "/logo512.png",
    apple: "/logo512.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <GoogleAnalytics />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <Toaster position="bottom-right" richColors />
      </body>
    </html>
  );
}