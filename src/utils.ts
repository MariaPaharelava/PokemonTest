export const random = (upTo: number): number =>
  Math.floor(Math.random() * upTo + 1);

export const calculateHits = (sum: number, prev: number): number => {
  return prev === 6 ? calculateHits(sum + 6, random(6)) : sum + prev;
};
