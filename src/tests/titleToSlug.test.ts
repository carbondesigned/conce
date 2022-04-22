import { titleToSlug } from '../utils/titleToSlug';

test("turns a string into a '-' separated lowercase slug format", () => {
  expect(titleToSlug('Hello World')).toBe('hello-world');
});
