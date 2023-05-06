interface ScienceItem {
    tag?: string,
    title: string,
    description: string[],
    authors: string[],
    date: string,
    journal: string,
    type: "academic paper" | "chapter" | "monograph" | "conference paper" | "other",
    link: string
}