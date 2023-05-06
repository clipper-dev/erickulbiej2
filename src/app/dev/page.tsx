import Image from "next/image";
import ProjectHero from "../../components/heros/ProjectHero";
import ContactForm from "../../components/sections/ContactForm";
import Hero from "../../components/sections/Hero";
import NewInBlog from "../../components/sections/NewInBlog";
import Newsletter from "../../components/sections/Newsletter";
import Projects from "../../components/sections/Projects";

export default function Home() {
  return (
    <>
      <div className="">
        <ProjectHero/>
        <Projects />
        <Newsletter />
        <ContactForm />
      </div>
    </>
  );
}
