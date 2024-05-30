import redPacket1 from './red-packet/1.jpeg';
import redPacket2 from './red-packet/2.jpeg';
import redPacket3 from './red-packet/3.jpeg';
import redPacket4 from './red-packet/4.jpeg';
import redPacket5 from './red-packet/5.jpeg';
import redPacket6 from './red-packet/6.jpeg';
import redPacket7 from './red-packet/7.jpeg';
import redPacket8 from './red-packet/8.jpeg';
import redPacket9 from './red-packet/9.jpeg';
import redPacket10 from './red-packet/10.jpeg';
import redPacket11 from './red-packet/11.jpeg';
import redPacket12 from './red-packet/12.jpeg';
import redPacket13 from './red-packet/13.jpeg';
import redPacket14 from './red-packet/14.jpeg';
import redPacket15 from './red-packet/15.jpeg';
import redPacket16 from './red-packet/16.jpeg';
import redPacket17 from './red-packet/17.jpeg';
import redPacket18 from './red-packet/18.jpeg';
import redPacket19 from './red-packet/19.jpeg';
import redPacket20 from './red-packet/20.jpeg';
import redPacket21 from './red-packet/21.jpeg';
import redPacket22 from './red-packet/22.jpeg';
import redPacket23 from './red-packet/23.jpeg';
import redPacket24 from './red-packet/24.jpeg';
import redPacket25 from './red-packet/25.jpeg';
import redPacket26 from './red-packet/26.jpeg';
import redPacket27 from './red-packet/27.jpeg';
import redPacket28 from './red-packet/28.jpeg';
import redPacket29 from './red-packet/29.jpeg';
import redPacket30 from './red-packet/30.jpeg';
import redPacket31 from './red-packet/31.jpeg';
import redPacket32 from './red-packet/32.jpeg';
import redPacket33 from './red-packet/33.jpeg';
import redPacket34 from './red-packet/34.jpeg';
import redPacket35 from './red-packet/35.jpeg';
import redPacket36 from './red-packet/36.jpeg';
import redPacket37 from './red-packet/37.jpeg';
import redPacket38 from './red-packet/38.jpeg';
import redPacket39 from './red-packet/39.jpeg';
import redPacket40 from './red-packet/40.jpeg';
import redPacket41 from './red-packet/41.jpeg';
import redPacket42 from './red-packet/42.jpeg';
import redPacket43 from './red-packet/43.jpeg';
import redPacket44 from './red-packet/44.jpeg';
import redPacket45 from './red-packet/45.jpeg';
import redPacket46 from './red-packet/46.jpeg';
import redPacket47 from './red-packet/47.jpeg';
import redPacket48 from './red-packet/48.jpeg';

export const RED_PACKET_IMAGE_ARRAY = [
  redPacket1,
  redPacket2,
  redPacket3,
  redPacket4,
  redPacket5,
  redPacket6,
  redPacket7,
  redPacket8,
  redPacket9,
  redPacket10,
  redPacket11,
  redPacket12,
  redPacket13,
  redPacket14,
  redPacket15,
  redPacket16,
  redPacket17,
  redPacket18,
  redPacket19,
  redPacket20,
  redPacket21,
  redPacket22,
  redPacket23,
  redPacket24,
  redPacket25,
  redPacket26,
  redPacket27,
  redPacket28,
  redPacket29,
  redPacket30,
  redPacket31,
  redPacket32,
  redPacket33,
  redPacket34,
  redPacket35,
  redPacket36,
  redPacket37,
  redPacket38,
  redPacket39,
  redPacket40,
  redPacket41,
  redPacket42,
  redPacket43,
  redPacket44,
  redPacket45,
  redPacket46,
  redPacket47,
  redPacket48,
];

export function getRandomRedPacketImage(i?: number | string) {
  const imageCount = 48;
  const index = i ? Number(i) % imageCount : Math.floor(Math.random() * imageCount);
  return RED_PACKET_IMAGE_ARRAY[index + 1];
}

export {
  redPacket1,
  redPacket2,
  redPacket3,
  redPacket4,
  redPacket5,
  redPacket6,
  redPacket7,
  redPacket8,
  redPacket9,
  redPacket10,
  redPacket11,
  redPacket12,
  redPacket13,
  redPacket14,
  redPacket15,
  redPacket16,
  redPacket17,
  redPacket18,
  redPacket19,
  redPacket20,
  redPacket21,
  redPacket22,
  redPacket23,
  redPacket24,
  redPacket25,
  redPacket26,
  redPacket27,
  redPacket28,
  redPacket29,
  redPacket30,
  redPacket31,
  redPacket32,
  redPacket33,
  redPacket34,
  redPacket35,
  redPacket36,
  redPacket37,
  redPacket38,
  redPacket39,
  redPacket40,
  redPacket41,
  redPacket42,
  redPacket43,
  redPacket44,
  redPacket45,
  redPacket46,
  redPacket47,
  redPacket48,
};
