import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: "zksdr418",
  dataset: "production",
  apiVersion: "2026-05-15",
  useCdn: true, // fast, cached, published-only
  // useCdn: false,
});

const token = import.meta.env.VITE_SANITY_TOKEN;
console.log("token length:", token?.length);
console.log("token prefix:", token?.slice(0, 4));

export const previewClient = createClient({
  projectId: "zksdr418",
  dataset: "production",
  apiVersion: "2026-05-15",
  useCdn: false,
  perspective: "previewDrafts", // see drafts, fall back to published
  token: import.meta.env.VITE_SANITY_TOKEN, // needed to read drafts at all
  ignoreBrowserTokenWarning: true,
});