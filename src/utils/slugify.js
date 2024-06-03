export function slugify(str) {
  let slug = "";

  if (str) {
    const timestamp = Date.now();
    slug = String(str)
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");

    slug = `${slug}-${timestamp}`;
  }

  return slug;
}
