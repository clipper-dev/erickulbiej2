import Image from "next/image";
import Hero from "../components/sections/Hero";
import NewInBlog from "../components/sections/NewInBlog";
import Projects from "../components/sections/Projects";

export default function Home() {
  return (
    <>
      <div className="">
        <Hero/>
        <NewInBlog/>
        <Projects />
      </div>
    </>
  );
}
