// BlogGrid.tsx
import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import type { SanityDocument } from "@sanity/client";
import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url";
import { client } from "../lib/sanity";
import { GOLD, FONTS, TEXT } from "../theme";

// ─── GROQ ──────────────────────────────────────────────────────────────────
const POSTS_QUERY = `*[
    _type == "post"
    && defined(slug.current)
    ]|order(publishedAt desc)[0...12]{
    _id,
    title,
    slug,
    publishedAt,
    image,
    excerpt
}`;

const { projectId, dataset } = client.config();

const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? createImageUrlBuilder({ projectId, dataset }).image(source)
    : null;

// ─── Blog card ─────────────────────────────────────────────────────────────
interface BlogCardProps {
  post: SanityDocument;
}

function BlogCard({ post }: BlogCardProps) {
  const [hovered, setHovered] = useState(false);

  const imageUrl = post.image
    ? urlFor(post.image)?.width(500).height(320).url()
    : null;

  return (
    <Link href={`/blog/${post.slug.current}`}>
      <div
        className="group flex flex-col flex-shrink-0 cursor-pointer transition-colors duration-300"
        style={{
          width: "min(80vw, 320px)",
          scrollSnapAlign: "start",
          background: hovered ? "rgba(231,170,81,0.07)" : "#06080a",
          border: `1px solid ${GOLD.hairline}`,
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Image */}
        <div
          className="w-full overflow-hidden"
          style={{ height: 180, borderBottom: `1px solid ${GOLD.hairline}` }}
        >
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={post.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div
              className="w-full h-full flex items-center justify-center"
              style={{ background: GOLD.faint }}
            >
              <span style={{ color: GOLD.muted, fontFamily: FONTS.heading, fontSize: "0.65rem" }}>
                No Image
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-col px-6 py-6">
          <p
            className="uppercase tracking-[0.22em] mb-3"
            style={{
              fontFamily: FONTS.heading,
              fontSize: "0.6rem",
              color: GOLD.primary,
            }}
          >
            {new Date(post.publishedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>

          <div className="w-8 mb-4" style={{ height: 1, background: GOLD.muted }} />

          <h3
            className="font-bold leading-snug mb-2"
            style={{
              fontFamily: FONTS.display,
              fontSize: "1.15rem",
              color: TEXT.cream,
            }}
          >
            {post.title}
          </h3>

          {post.excerpt && (
            <p
              className="text-sm leading-[1.7] line-clamp-3"
              style={{ fontFamily: FONTS.body, color: TEXT.muted }}
            >
              {post.excerpt}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}

// ─── Blog grid (scrollable row) ─────────────────────────────────────────────
export function BlogGrid() {
  const [posts, setPosts] = useState<SanityDocument[]>([]);
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    client.fetch<SanityDocument[]>(POSTS_QUERY).then(setPosts);
  }, []);

  const scrollByAmount = (dir: "left" | "right") => {
    const el = scrollerRef.current;
    if (!el) return;
    const cardWidth = el.firstElementChild?.clientWidth ?? 320;
    el.scrollBy({
      left: dir === "left" ? -(cardWidth + 24) * 2 : (cardWidth + 24) * 2,
      behavior: "smooth",
    });
  };

  if (posts.length === 0) return null;

  return (
    <section
      id="blog"
      className="relative py-16 px-8"
      style={{ borderTop: `1px solid ${GOLD.hairline}`, background: "#06080a" }}
    >
      {/* Section header */}
      <div className="flex items-center justify-between mb-10 max-w-6xl mx-auto">
        <div>
          <h2
            className="font-bold"
            style={{ fontFamily: FONTS.display, fontSize: "clamp(1.4rem, 3vw, 2rem)", color: TEXT.cream }}
          >
            Latest Blogs
          </h2>
        </div>

        {/* Arrows */}
        <div className="hidden md:flex gap-3">
          <button
            onClick={() => scrollByAmount("left")}
            aria-label="Scroll left"
            className="w-10 h-10 flex items-center justify-center transition-colors duration-200"
            style={{ border: `1px solid ${GOLD.muted}`, color: GOLD.light, background: "transparent" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = GOLD.faint)}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
          >
            ←
          </button>
          <button
            onClick={() => scrollByAmount("right")}
            aria-label="Scroll right"
            className="w-10 h-10 flex items-center justify-center transition-colors duration-200"
            style={{ border: `1px solid ${GOLD.muted}`, color: GOLD.light, background: "transparent" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = GOLD.faint)}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
          >
            →
          </button>
        </div>
      </div>

      {/* Scrollable row */}
      <div
        ref={scrollerRef}
        className="flex gap-6 overflow-x-auto pb-4 max-w-6xl mx-auto"
        style={{
          scrollSnapType: "x mandatory",
          scrollbarWidth: "none",
        }}
      >
        {posts.map((post) => (
          <BlogCard key={post._id} post={post} />
        ))}
      </div>
    </section>
  );
}