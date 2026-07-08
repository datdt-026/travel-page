import type { StaticImageData } from 'next/image';

import hanoiImg5446 from './images/HaNoi/IMG_5446.jpg';
import hanoiImg5447 from './images/HaNoi/IMG_5447.jpg';
import hanoiImg5454 from './images/HaNoi/IMG_5454.jpg';
import hanoiImg5456 from './images/HaNoi/IMG_5456.jpg';
import hanoiImg5459 from './images/HaNoi/IMG_5459.jpg';
import hanoiImg5491 from './images/HaNoi/IMG_5491.jpg';
import hanoiImg5495 from './images/HaNoi/IMG_5495.jpg';
import hanoiImg5505 from './images/HaNoi/IMG_5505.jpg';
import hanoiImg5538 from './images/HaNoi/IMG_5538.jpg';
import hanoiImg5543 from './images/HaNoi/IMG_5543.jpg';
import hanoiImg5609 from './images/HaNoi/IMG_5609.jpg';
import hanoiImg5617 from './images/HaNoi/IMG_5617.jpg';
import hanoiImg5617Alt from './images/HaNoi/IMG_5617(1).jpg';
import hanoiImg5669 from './images/HaNoi/IMG_5669.jpg';
import hanoiImg5211 from './images/HaNoi/IMG_5211.jpg';
import hanoiImg5221 from './images/HaNoi/IMG_5221.jpg';
import hanoiImg5289 from './images/HaNoi/IMG_5289.jpg';

export const mockImages = {
  hero: hanoiImg5456,
  street: hanoiImg5491,
  temple: hanoiImg5447,
  oldQuarter: hanoiImg5446,
  lake: hanoiImg5617,
  market: hanoiImg5505,
  culture: hanoiImg5543,
  food: hanoiImg5538,
  detail: hanoiImg5289,
  journey: hanoiImg5609,
  partner: hanoiImg5669,
  cta: hanoiImg5459,
} satisfies Record<string, StaticImageData>;

export const mockImageList = [
  hanoiImg5456,
  hanoiImg5491,
  hanoiImg5447,
  hanoiImg5617,
  hanoiImg5505,
  hanoiImg5446,
  hanoiImg5543,
  hanoiImg5289,
  hanoiImg5669,
  hanoiImg5459,
  hanoiImg5221,
  hanoiImg5538,
  hanoiImg5495,
  hanoiImg5617Alt,
  hanoiImg5211,
  hanoiImg5454,
  hanoiImg5609,
];

export function getMockImage(index = 0): StaticImageData {
  const shuffledIndex = Math.abs(index * 7 + 3) % mockImageList.length;
  return mockImageList[shuffledIndex];
}

export function getMockImageSrc(index = 0): string {
  return getMockImage(index).src;
}

export function getRandomMockImage(): StaticImageData {
  return mockImageList[Math.floor(Math.random() * mockImageList.length)];
}

export function getRandomMockImageSrc(): string {
  return getRandomMockImage().src;
}
