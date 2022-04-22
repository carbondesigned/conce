import { generateRandomImage, images } from '../utils/generateRandomImage';

test('a random image to be return from the array of images', () => {
  expect(typeof generateRandomImage(images)).toBe(typeof 'string');
});
