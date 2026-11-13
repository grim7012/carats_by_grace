// src/data/photos.js
// Exports all 24 high-resolution fine jewelry photos downloaded from the brand drive.

import photo01 from '../components/photos/photo_01.jpg';
import photo02 from '../components/photos/photo_02.jpg';
import photo03 from '../components/photos/photo_03.jpg';
import photo04 from '../components/photos/photo_04.jpg';
import photo05 from '../components/photos/photo_05.jpg';
import photo06 from '../components/photos/photo_06.jpg';
import photo07 from '../components/photos/photo_07.jpg';
import photo08 from '../components/photos/photo_08.jpg';
import photo09 from '../components/photos/photo_09.jpg';
import photo10 from '../components/photos/photo_10.jpg';
import photo11 from '../components/photos/photo_11.jpg';
import photo12 from '../components/photos/photo_12.jpg';
import photo13 from '../components/photos/photo_13.jpg';
import photo14 from '../components/photos/photo_14.jpg';
import photo15 from '../components/photos/photo_15.jpg';
import photo16 from '../components/photos/photo_16.jpg';
import photo17 from '../components/photos/photo_17.jpg';
import photo18 from '../components/photos/photo_18.jpg';
import photo19 from '../components/photos/photo_19.jpg';
import photo20 from '../components/photos/photo_20.jpg';
import photo21 from '../components/photos/photo_21.jpg';
import photo22 from '../components/photos/photo_22.jpg';
import photo23 from '../components/photos/photo_23.jpg';
import photo24 from '../components/photos/photo_24.jpg';

export const JEWELRY_PHOTOS = [
  photo01, photo02, photo03, photo04, photo05, photo06,
  photo07, photo08, photo09, photo10, photo11, photo12,
  photo13, photo14, photo15, photo16, photo17, photo18,
  photo19, photo20, photo21, photo22, photo23, photo24,
];

// Backward-compatible named exports
export const necklace1 = photo01;
export const necklace2 = photo02;
export const necklace3 = photo03;

export {
  photo01, photo02, photo03, photo04, photo05, photo06,
  photo07, photo08, photo09, photo10, photo11, photo12,
  photo13, photo14, photo15, photo16, photo17, photo18,
  photo19, photo20, photo21, photo22, photo23, photo24,
};

/**
 * Returns a primary jewelry photo by index from the 24 brand photos.
 */
export const getJewelryPhoto = (index) => JEWELRY_PHOTOS[Math.abs(index) % JEWELRY_PHOTOS.length];

/**
 * Returns a distinct hover jewelry photo by index from the 24 brand photos.
 */
export const getJewelryHover = (index) => JEWELRY_PHOTOS[(Math.abs(index) + 1) % JEWELRY_PHOTOS.length];
