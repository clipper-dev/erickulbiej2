interface ProjectItem {
	tag: string,
	layout: "left" | "right",
	image: string,
	name: string,
	description: string[],
	technologies: Technology[]
}