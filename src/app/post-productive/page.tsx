import Image from "next/image";
import ProjectHero from "../../components/heros/ProjectHero";
import ContactForm from "../../components/sections/ContactForm";
import Hero from "../../components/sections/Hero";
import Blog from "../../components/sections/Blog";
import Newsletter from "../../components/sections/Newsletter";
import BlogHero from "../../components/heros/BlogHero";
import Head from "next/head";
import CustomHead from "../../components/nav/CustomHead";
import type { Metadata } from "next";

export const metadata : Metadata= {
  title: "Post Productive - A Blog About Productivity, by Eric Kulbiej",
  description:
    "Here you can read Post Productive, a blog about productivity, written by Eric Kulbiej, a frontend developer, researcher, and seafarer.",
  openGraph: {
    title: "Post Productive - A Blog About Productivity, by Eric Kulbiej",
    description:
      "Here you can read Post Productive, a blog about productivity, written by Eric Kulbiej, a frontend developer, researcher, and seafarer.",
    url: "https://www.erickulbiej.com/post-productive",
    type: "website",
    images: [
      {
        url: "https://www.erickulbiej.com/images/og-image.jpg",
        width: 800,
        height: 600,
        alt: "Post Productive - A Blog About Productivity, by Eric Kulbiej",
      },
    ],
  },

};

export default function Home() {

  return (
    <>
      <div className="">
        <BlogHero />
        {/* @ts-expect-error Server Component */}
        <Blog />
        <Newsletter />
        <ContactForm />
      </div>
    </>
  );
}
