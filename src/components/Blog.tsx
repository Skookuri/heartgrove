import { Link, useRoute } from "wouter";
import { useEffect, useState } from "react";
import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url";
import type { SanityDocument } from "@sanity/client";
import { PortableText } from "@portabletext/react";
import { client, previewClient } from "../lib/sanity";
import { isPreviewMode } from "../lib/preview";
import { GlobalStyles } from "./GlobalStyles";
import { GOLD, GOLD_GRADIENT, GOLD_RULE_GRADIENT, TEXT, FONTS } from "../theme";
import { GoldDivider, CornerOrnaments } from "./ui";
import logo from "/src/images/MW_Logo_Whiter.png";
import { Footer } from "./Footer";

// ─── GROQ — expand author and ctaBtn references ───────────────────────────────
const POST_QUERY = `
	*[_type == "post" && slug.current == $slug][0] {
	title,
	publishedAt,
	image,
	bannerAlt,
	body[] {
		...,
		_type == "image" => {
		...,
		asset-> {
			_id,
			url,
			metadata { lqip }
		},
		alt,
		caption
		}
	},
	"author": author-> {
		name,
		image
	},
	"ctaBtn": ctaBtn-> {
		text,
		url
	}
	}
`;

const { projectId, dataset } = client.config();

const urlFor = (source: SanityImageSource) =>
	projectId && dataset
		? createImageUrlBuilder({ projectId, dataset }).image(source)
		: null;

// ─── PortableText component overrides ────────────────────────────────────────
type PortableTextImageValue = {
	asset?: {
		_id: string;
		url: string;
		metadata?: { lqip?: string };
	};
	alt?: string;
	caption?: string;
	hotspot?: { x: number; y: number; height: number; width: number };
	crop?: { top: number; bottom: number; left: number; right: number };
};

const ptComponents = {
	block: {
		normal: ({ children }: { children?: React.ReactNode }) => (
			<p
			className="mb-5 text-xl leading-[1.9]"
			style={{ fontFamily: FONTS.body, color: TEXT.cream }}
			>
			{children}
			</p>
		),
		h1: ({ children }: { children?: React.ReactNode }) => (
			<h1
			className="font-bold mt-10 mb-4"
			style={{
				fontFamily: FONTS.display,
				fontSize: "clamp(1.4rem, 3vw, 2rem)",
				color: GOLD.primary,
			}}
			>
			{children}
			</h1>
		),
		h2: ({ children }: { children?: React.ReactNode }) => (
			<h2
			className="font-bold mt-8 mb-3"
			style={{
				fontFamily: FONTS.display,
				fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)",
				color: GOLD.primary,
			}}
			>
			{children}
			</h2>
		),
		h3: ({ children }: { children?: React.ReactNode }) => (
			<h3
			className="font-bold mt-6 mb-2 uppercase tracking-[0.1em]"
			style={{
				fontFamily: FONTS.heading,
				fontSize: "0.9rem",
				color: GOLD.primary,
			}}
			>
			{children}
			</h3>
		),
		blockquote: ({ children }: { children?: React.ReactNode }) => (
			<blockquote
			className="my-6 pl-5 italic"
			style={{
				borderLeft: `2px solid ${GOLD.muted}`,
				fontFamily: FONTS.body,
				color: TEXT.muted,
				fontSize: "1.1rem",
			}}
			>
			{children}
			</blockquote>
		),
		},
		marks: {
		strong: ({ children }: { children?: React.ReactNode }) => (
			<strong style={{ color: TEXT.cream, fontWeight: 600 }}>{children}</strong>
		),
		em: ({ children }: { children?: React.ReactNode }) => (
			<em style={{ color: GOLD.light }}>{children}</em>
		),
		link: ({ value, children }: { value?: { href: string }; children?: React.ReactNode }) => (
			<a
			href={value?.href}
			target="_blank"
			rel="noopener noreferrer"
			style={{ color: GOLD.primary, textDecoration: "underline", textUnderlineOffset: 3 }}
			>
			{children}
			</a>
		),
		},
		list: {
		bullet: ({ children }: { children?: React.ReactNode }) => (
			<ul
			className="mb-5 pl-5 space-y-2"
			style={{ fontFamily: FONTS.body, color: TEXT.muted, fontSize: "1.05rem" }}
			>
			{children}
			</ul>
		),
		number: ({ children }: { children?: React.ReactNode }) => (
			<ol
			className="mb-5 pl-5 space-y-2 list-decimal"
			style={{ fontFamily: FONTS.body, color: TEXT.muted, fontSize: "1.05rem" }}
			>
			{children}
			</ol>
		),
		},
		listItem: {
		bullet: ({ children }: { children?: React.ReactNode }) => (
			<li style={{ listStyleType: "none" }}>
			<span style={{ color: GOLD.primary, marginRight: 8 }}>✦</span>
			{children}
			</li>
		),
		number: ({ children }: { children?: React.ReactNode }) => (
			<li>{children}</li>
		),
	},
	types: {
	image: ({ value }: { value: PortableTextImageValue }) => {
		// Return null if the image asset object is completely missing
		if (!value?.asset) return null;

		const imageUrl = urlFor(value)
		?.width(1400)
		.quality(90)
		.auto("format")
		.url();

		if (!imageUrl) return null;

		return (
		<figure
			className="my-10 overflow-hidden"
			style={{
			border: `1px solid ${GOLD.hairline}`,
			background: "#06080a",
			}}
		>
			<div className="w-full aspect-video overflow-hidden">
			<img
				src={imageUrl}
				alt={value.alt || "Blog post illustration"}
				className="w-full h-full object-cover"
				loading="lazy"
			/>
			</div>

			{/* Only render caption if the editor actually filled it out */}
			{value.caption && (
			<figcaption
				className="px-4 py-3 text-center italic"
				style={{
				fontFamily: FONTS.body,
				fontSize: "0.9rem",
				color: TEXT.muted,
				borderTop: `1px solid ${GOLD.hairline}`,
				}}
			>
				{value.caption}
			</figcaption>
			)}
		</figure>
		);
	},
	},
};

// ─── Component ───────────────────────────────────────────────────────────────
export default function Post() {
	const [, params] = useRoute("/blog/:slug");
	const [post, setPost] = useState<SanityDocument | null>(null);
	const [loading, setLoading] = useState(true);
	
	const isPreview = isPreviewMode();
	console.log("full URL:", window.location.href);
	console.log("isPreview:", isPreview, window.location.search);
	
	useEffect(() => {
		if (!params?.slug) return;
		const activeClient = isPreview ? previewClient : client;

		activeClient
			.fetch<SanityDocument>(POST_QUERY, { slug: params.slug })
			.then((data) => {
			setPost(data);
			setLoading(false);
			});
		}, [params?.slug, isPreview]);
	// 	client
	// 		.fetch<SanityDocument>(POST_QUERY, { slug: params.slug })
	// 		// Tells Sanity to show the live typing draft if it exists, otherwise fall back to published
    // 		perspective: 'previewDrafts',
	// 		// Always use false here so your preview updates instantly on every single keystroke
    // 		useCdn: false,  
	// 		.then((data) => {
	// 		setPost(data);
	// 		setLoading(false);
	// 		});
	// }, [params?.slug]);

	// ── Loading state ──────────────────────────────────────────────────────────
	if (loading) {
		return (
			<>
			<GlobalStyles />
			<div
				className="min-h-screen flex items-center justify-center"
				style={{ background: "#06080a" }}
			>
				<p
				className="uppercase tracking-[0.3em]"
				style={{ fontFamily: FONTS.heading, fontSize: "0.7rem", color: GOLD.muted }}
				>
				Loading...
				</p>
			</div>
			</>
		);
	}

	// ── 404 state ──────────────────────────────────────────────────────────────
	if (!post) {
		return (
		<>
			<GlobalStyles />
			<div
			className="min-h-screen flex flex-col items-center justify-center gap-4"
			style={{ background: "#06080a" }}
			>
			<p
				className="uppercase tracking-[0.3em]"
				style={{ fontFamily: FONTS.heading, fontSize: "0.7rem", color: GOLD.muted }}
			>
				Post not found
			</p>
			<Link href="/">
				<span style={{ color: GOLD.primary, fontFamily: FONTS.heading, fontSize: "0.7rem" }}>
				← Back Home
				</span>
			</Link>
			</div>
		</>
		);
	}

	const postImageUrl = post.image
		? urlFor(post.image)?.width(1200).height(500).url()
		: null;

	const authorImageUrl = post.author?.image
		? urlFor(post.author.image)?.width(200).height(200).quality(100).url()
		: null;

	console.log("alt text time:", post.bannerAlt);
	return (
		<>
		<GlobalStyles />

		<div
			className="min-h-screen flex flex-col overflow-x-hidden"
			style={{ background: "#06080a", color: TEXT.cream }}
		>
			{/* ── Nav ──────────────────────────────────────────────────────── */}
			<header
			className="w-full flex items-center justify-between px-8 py-3"
			style={{
				background: "rgba(4,5,8,0.96)",
				backdropFilter: "blur(8px)",
				borderBottom: `1px solid ${GOLD.hairline}`,
				position: "sticky",
				top: 0,
				zIndex: 50,
			}}
			>
			<Link href="/">
				<img src={logo} alt="Mystwood Games" className="h-16 cursor-pointer" />
			</Link>

			<Link href="/">
				<button
				className="uppercase tracking-[0.18em] px-6 py-2 cursor-pointer transition-all duration-200"
				style={{
					fontFamily: FONTS.heading,
					fontSize: "0.68rem",
					border: `1px solid ${GOLD.muted}`,
					color: GOLD.light,
					background: "transparent",
				}}
				onMouseEnter={(e) => {
					e.currentTarget.style.background = GOLD.faint;
					e.currentTarget.style.borderColor = GOLD.primary;
				}}
				onMouseLeave={(e) => {
					e.currentTarget.style.background = "transparent";
					e.currentTarget.style.borderColor = GOLD.muted;
				}}
				>
				← Back Home
				</button>
			</Link>
			</header>

			{/* ── Hero image ───────────────────────────────────────────────── */}
			{postImageUrl && (
			<div className="w-full overflow-hidden" style={{ maxHeight: 420 }}>
				<img
					src={postImageUrl}
					alt={post.bannerAlt}
					className="w-full object-cover object-top"
					style={{ display: "block" }}
				/>
			</div>
			)}

			{/* ── Article ──────────────────────────────────────────────────── */}
			<article
			className="relative flex-1 w-full max-w-3xl mx-auto px-8 py-16 overflow-hidden"
			>
			<CornerOrnaments />

			{/* Date */}
			<p
				className="uppercase tracking-[0.28em] mb-5"
				style={{
				fontFamily: FONTS.heading,
				fontSize: "0.62rem",
				color: GOLD.primary,
				}}
			>
				{new Date(post.publishedAt).toLocaleDateString("en-US", {
				year: "numeric",
				month: "long",
				day: "numeric",
				})}
			</p>

			{/* Title */}
			<h1
				className="font-bold leading-tight mb-6"
				style={{
				fontFamily: FONTS.display,
				fontSize: "clamp(1.8rem, 4vw, 3rem)",
				color: GOLD.light,
				textShadow: "0 2px 24px rgba(231,170,81,0.15)",
				}}
			>
				{post.title}
			</h1>

			{/* Gold rule */}
			<div
				className="w-full mb-8"
				style={{
				height: 1,
				background: GOLD_RULE_GRADIENT,
				}}
			/>

			{/* Author */}
			{post.author && (
				<div className="flex items-center gap-4 mb-10">
				{authorImageUrl && (
					<img
					src={authorImageUrl}
					alt={post.author.name}
					className="rounded-full object-cover flex-shrink-0"
					style={{
						width: 100,
						height: 100,
						border: `3px solid ${GOLD.primary}`,
					}}
					/>
				)}
				<div>
					<p
					className="uppercase tracking-[0.18em]"
					style={{
						fontFamily: FONTS.heading,
						fontSize: "0.6rem",
						color: TEXT.cream,
					}}
					>
					Written by
					</p>
					<p
					style={{
						fontFamily: FONTS.heading,
						fontSize: "1rem",
						color: GOLD.light,
					}}
					>
					{post.author.name}
					</p>
				</div>
				</div>
			)}

			{/* Body */}
			{Array.isArray(post.body) && (
				// ts-expect-error — ptComponents typing is loose but correct at runtime
				<PortableText value={post.body} components={ptComponents} />
			)}

			{/* CTA Button */}
			{post.ctaBtn?.url && (
			<>
				<div
				className="w-full my-10"
				style={{ height: 1, background: GOLD_RULE_GRADIENT }}
				/>
				<div className="flex justify-center py-8">
				{/* <p
					className="uppercase tracking-[0.25em] mb-4"
					style={{
						fontFamily: FONTS.heading,
						fontSize: "0.62rem",
						color: GOLD.primary,
					}}
					>
					Interested in More?
				</p> */}
				<a
					href={post.ctaBtn.url}
					target="_blank"
					rel="noopener noreferrer"
					className="inline-block uppercase tracking-[0.2em] font-bold px-10 py-4 transition-all duration-200 hover:-translate-y-0.5 no-underline"
					style={{
					fontFamily: FONTS.heading,
					fontSize: "0.78rem",
					background: GOLD_GRADIENT,
					color: "#06080a",
					border: "none",
					boxShadow: "0 4px 28px rgba(231,170,81,0.3)",
					}}
				>
					{post.ctaBtn.text}
				</a>
				</div>
			</>
			)}
			</article>

			<GoldDivider ornament />

			<Footer />
		</div>
		</>
	);
}