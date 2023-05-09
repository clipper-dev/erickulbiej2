import Image from "next/image";
import ContactForm from "../components/sections/ContactForm";
import Hero from "../components/sections/Hero";
import NewInBlog from "../components/sections/NewInBlog";
import Newsletter from "../components/sections/Newsletter";
import Projects from "../components/sections/Projects";
export const revalidate = 60;
export default function Home() {
  return (
    <>
      <div className="">
        <Hero />
        {/* @ts-expect-error Server Component */}
        <NewInBlog />
        <Projects />
        <Newsletter />
        <ContactForm />
      </div>
    </>
  );
}
