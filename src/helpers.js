// min and max included
export function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function createArray(size) {
  return Array.from(Array(size).keys());
}
