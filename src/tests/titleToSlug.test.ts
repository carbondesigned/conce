import { titleToSlug } from '../utils/titleToSlug';

/* Testing the titleToSlug function to see if it is working properly. */
test("turns a string into a '-' separated lowercase slug format", () => {
  expect(titleToSlug('Hello World')).toBe('hello-world');
});
