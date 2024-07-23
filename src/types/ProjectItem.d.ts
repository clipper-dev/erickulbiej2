interface ProjectItem {
	tag: string,
	layout: "left" | "right",
	image: string,
	name: string,
	description: string[],
	technologies: Technology[]
}

interface Project {
	name: string;
    description: string;
    keywords: string[];
    image: string;
    link: string;
}