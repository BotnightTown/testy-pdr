export function getFullImageSrc(src: string) {
  if (!src) return "";

  return src.startsWith("/") || src.startsWith("http") ? src : `/${src}`;
}
