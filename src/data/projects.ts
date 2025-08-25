import { data as techs } from "./techs";
export const data: ProjectItem[] = [
  {
    tag: "WEBSITE",
    layout: "left",
    image: "/res/projects/purspray.png",
    name: "PurSpray",
    description: [
      "The website of a construction company that insulates buildings and rooms with Pur foam, maintained in a modern edition and ensuring a responsive design.",
      "Using an orange and warm color palette on the website of a construction company that specializes in insulating buildings and rooms with Pur foam can be an effective way to resonate with the service being offered.",
      "Using a modern design and a responsive layout, the website is easy to use on any device and is easy to navigate.",
    ],
    technologies: [
      techs[techs.findIndex((obj) => obj.name === "react")],
      techs[techs.findIndex((obj) => obj.name === "next")],
      techs[techs.findIndex((obj) => obj.name === "css")],
    ],
  },
  {
    tag: "E-LEARNING",
    layout: "right",
    image: "/res/projects/coderburg.png",
    name: "Coderburg",
    description: [
      "Modern e-learning platform aiming to teach front-end development and web technologies.",
      "The value proposal consists of courses on web programming languages like JavaScript, HTML, and CSS; as well as providing detailed explanation of technical interview questions, front-end technologies and step by step tutorials.",
      "Coderburg provides projects with detailed step-by-step walkthrough and self-made tools useful for even experienced developers.",
    ],
    technologies: [
      techs[techs.findIndex((obj) => obj.name === "react")],
      techs[techs.findIndex((obj) => obj.name === "next")],
      techs[techs.findIndex((obj) => obj.name === "tailwind")],
    ],
  },
  {
    tag: "WEBSITE",
    layout: "left",
    image: "/res/projects/nordszczecin.png",
    name: "Nord Szczecin",
    description: [
      "The website of a company offering bespoke kitchens and furniture, as well as carpentry services.",
      "Modern and minimalistic design was achieved in combination with dark palette of colours, powerful images and green accent.",
      "The website is fitted with several subpages as well as blog section.",
    ],
    technologies: [
      techs[techs.findIndex((obj) => obj.name === "react")],
      techs[techs.findIndex((obj) => obj.name === "next")],
      techs[techs.findIndex((obj) => obj.name === "css")],
    ],
  },
];

export const projectsLeft: Project[] = [
  {
    name: "Ship Maneuvering Simulator",
    description: "A 2D real-time ship maneuvering simulator.",
    keywords: ["Ship", "Simulation", "NextJS"],
    image: "/res/projects/shipManeuver.png",
    link: "/projects/simulator",
  },
  {
    name: "Coderburg",
    description:
      "Modern e-learning platform aiming to teach front-end development and web technologies.",
    keywords: ["Web", "E-learning"],
    image: "/res/projects/coderburg-card.png",
    //image: "/res/projects/majordomu-card.png",
    link: "https://coderburg.com/",
  },
  {
    name: "Majordomu",
    description: "Productivity web app for organizing and managing routines.",
    keywords: ["Startup", "Productivity", "NextJS"],
    image: "/res/projects/majordomu-card.png",
    link: "https://Majordomu.com/",
  },
];

export const projectsRight: Project[] = [
  {
    name: "FerrySafe",
    description: "Training and onboarding platform for ferry crew.",
    keywords: ["Maritime", "Training", "NextJS"],
    image: "/res/projects/ferrysafe-card.png",
    //image: "/res/projects/majordomu-card.png",
    link: "https://ferrysafe.app/",
  },
  {
    name: "Last Moment Maneouvre",
    description:
      "Research project focusing on modelling and simulation of ship's last moment evasive maneuvers.",
    keywords: ["Maritime", "Research", "Matlab"],
    //image: "/res/projects/last-moment-maneuvre.png",
    image: "/res/projects/lmm-card.png",
    link: "/research",
  },
];
