import Image from "next/image";
import ProjectHero from "../../components/heros/ProjectHero";
import ContactForm from "../../components/sections/ContactForm";
import Hero from "../../components/sections/Hero";
import Blog from "../../components/sections/Blog";
import Newsletter from "../../components/sections/Newsletter";
import BlogHero from "../../components/heros/BlogHero";

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
