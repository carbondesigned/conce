import { generateRandomImage, images } from '../utils/generateRandomImage';

/* This is a test that checks if the type of the return value of the function is a string. */
test('a random image to be return from the array of images', () => {
  expect(typeof generateRandomImage(images)).toBe(typeof 'string');
});
