import { Link, useRoute } from "wouter";
import { useEffect, useState } from "react";
import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url";
import type { SanityDocument } from "@sanity/client";
import { PortableText } from "@portabletext/react";
import { client } from "../lib/sanity";

const POST_QUERY = `
  *[_type == "post" && slug.current == $slug][0]
`;

const { projectId, dataset } = client.config();

const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? createImageUrlBuilder({ projectId, dataset }).image(source)
    : null;

export default function Post() {
  const [, params] = useRoute("/post/:slug");
  const [post, setPost] = useState<SanityDocument | null>(null);

  useEffect(() => {
    if (!params?.slug) return;

    client
      .fetch<SanityDocument>(POST_QUERY, { slug: params.slug })
      .then(setPost);
  }, [params?.slug]);

  if (!post) {
    return <p className="p-8">Loading...</p>;
  }

  const postImageUrl = post.image
    ? urlFor(post.image)?.width(550).height(310).url()
    : null;

  return (
    <main className="container mx-auto min-h-screen max-w-3xl p-8 flex flex-col gap-4">
      <Link href="/">
        ← Back to posts
      </Link>

      {postImageUrl && (
        <img
          src={postImageUrl}
          alt={post.title}
          className="aspect-video rounded-xl"
        />
      )}

      <h1 className="text-4xl font-bold">
        {post.title}
      </h1>

      <div className="prose">
        <p>
          Published: {new Date(post.publishedAt).toLocaleDateString()}
        </p>

        {Array.isArray(post.body) && (
          <PortableText value={post.body} />
        )}
      </div>
    </main>
  );
}