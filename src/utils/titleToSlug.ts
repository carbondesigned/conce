/**
 * It takes a string, converts it to lowercase, replaces all non-alphanumeric characters with a dash,
 * and removes any leading or trailing dashes
 * @param {string} title - The title of the post
 * @returns A slugified version of the title.
 */
export function titleToSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
