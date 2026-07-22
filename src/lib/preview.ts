export function isPreviewMode() {
    return new URLSearchParams(window.location.search).has("sanity-preview-perspective");
}