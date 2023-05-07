import { client } from "./lib/client";
export async function getPosts() {
  const data = await client.fetch(
    `*[_type == "post"]{_id, publishedAt, bio, title, "categories": categories[]->title, "slug": slug.current, author->{name, "image":image.asset->url}, "mainImage": mainImage.asset->url, readingTime, body}`
  );
  return data;
}

export async function getPost(slug: any) {
  const data = await client.fetch(
    `*[_type == "post" && slug.current == "${slug}"][0]{_id, publishedAt, bio, title, "categories": categories[]->title, author->{name, "image":image.asset->url}, "slug": slug.current, "mainImage": mainImage.asset->url, readingTime, body}`
  );
  return data;
}
