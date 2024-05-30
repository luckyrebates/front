import christmasGift1 from './christmas-gifts/1.jpeg';
import christmasGift2 from './christmas-gifts/2.jpeg';
import christmasGift3 from './christmas-gifts/3.jpeg';
import christmasGift4 from './christmas-gifts/4.jpeg';
import christmasGift5 from './christmas-gifts/5.jpeg';
import christmasGift6 from './christmas-gifts/6.jpeg';
import christmasGift7 from './christmas-gifts/7.jpeg';
import christmasGift8 from './christmas-gifts/8.jpeg';
import christmasGift9 from './christmas-gifts/9.jpeg';
import christmasGift10 from './christmas-gifts/10.jpeg';
import christmasGift11 from './christmas-gifts/11.jpeg';
import christmasGift12 from './christmas-gifts/12.jpeg';
import christmasGift13 from './christmas-gifts/13.jpeg';
import christmasGift14 from './christmas-gifts/14.jpeg';
import christmasGift15 from './christmas-gifts/15.jpeg';
import christmasGift16 from './christmas-gifts/16.jpeg';
import christmasGift17 from './christmas-gifts/17.jpeg';
import christmasGift18 from './christmas-gifts/18.jpeg';
import christmasGift19 from './christmas-gifts/19.jpeg';
import christmasGift20 from './christmas-gifts/20.jpeg';
import christmasGift21 from './christmas-gifts/21.jpeg';
import christmasGift22 from './christmas-gifts/22.jpeg';
import christmasGift23 from './christmas-gifts/23.jpeg';
import christmasGift24 from './christmas-gifts/24.jpeg';
import christmasGift25 from './christmas-gifts/25.jpeg';
import christmasGift26 from './christmas-gifts/26.jpeg';
import christmasGift27 from './christmas-gifts/27.jpeg';
import christmasGift28 from './christmas-gifts/28.jpeg';
import christmasGift29 from './christmas-gifts/29.jpeg';
import christmasGift30 from './christmas-gifts/30.jpeg';
import christmasGift31 from './christmas-gifts/31.jpeg';
import christmasGift32 from './christmas-gifts/32.jpeg';

export const CHRISTMAS_GIFT_IMAGE_ARRAY = [
  christmasGift1,
  christmasGift2,
  christmasGift3,
  christmasGift4,
  christmasGift5,
  christmasGift6,
  christmasGift7,
  christmasGift8,
  christmasGift9,
  christmasGift10,
  christmasGift11,
  christmasGift12,
  christmasGift13,
  christmasGift14,
  christmasGift15,
  christmasGift16,
  christmasGift17,
  christmasGift18,
  christmasGift19,
  christmasGift20,
  christmasGift21,
  christmasGift22,
  christmasGift23,
  christmasGift24,
  christmasGift25,
  christmasGift26,
  christmasGift27,
  christmasGift28,
  christmasGift29,
  christmasGift30,
  christmasGift31,
  christmasGift32,
];

export function getRandomChristmasGiftImage(i?: number | string) {
  const imageCount = 32;
  const index = i ? Number(i) % imageCount : Math.floor(Math.random() * imageCount);
  return CHRISTMAS_GIFT_IMAGE_ARRAY[index + 1];
}

export {
  christmasGift1,
  christmasGift2,
  christmasGift3,
  christmasGift4,
  christmasGift5,
  christmasGift6,
  christmasGift7,
  christmasGift8,
  christmasGift9,
  christmasGift10,
  christmasGift11,
  christmasGift12,
  christmasGift13,
  christmasGift14,
  christmasGift15,
  christmasGift16,
  christmasGift17,
  christmasGift18,
  christmasGift19,
  christmasGift20,
  christmasGift21,
  christmasGift22,
  christmasGift23,
  christmasGift24,
  christmasGift25,
  christmasGift26,
  christmasGift27,
  christmasGift28,
  christmasGift29,
  christmasGift30,
  christmasGift31,
  christmasGift32,
};
