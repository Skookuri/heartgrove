import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: "zksdr418",
  dataset: "production",
  apiVersion: "2026-05-15",
  useCdn: true, // fast, cached, published-only
  // useCdn: false,
});

export const previewClient = createClient({
  projectId: "zksdr418",
  dataset: "production",
  apiVersion: "2026-05-15",
  useCdn: false,
  perspective: "previewDrafts", // see drafts, fall back to published
  token: import.meta.env.VITE_SANITY_TOKEN, // needed to read drafts at all
  ignoreBrowserTokenWarning: true,
});