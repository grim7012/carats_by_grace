// src/data/photos.js
// Exports the 3 jewelry photos from src/components/photos/ to be used alternately across the website.

import necklace1 from '../components/photos/necklace1.jpg';
import necklace2 from '../components/photos/necklace2.jpg';
import necklace3 from '../components/photos/necklace3.jpg';

export { necklace1, necklace2, necklace3 };

export const JEWELRY_PHOTOS = [necklace1, necklace2, necklace3];

export const getJewelryPhoto = (index) => JEWELRY_PHOTOS[Math.abs(index) % JEWELRY_PHOTOS.length];
export const getJewelryHover = (index) => JEWELRY_PHOTOS[(Math.abs(index) + 1) % JEWELRY_PHOTOS.length];
