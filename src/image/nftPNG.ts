import nft1 from './nft/nft-1.png';
import nft2 from './nft/nft-2.png';
import nft3 from './nft/nft-3.png';
import nft4 from './nft/nft-4.png';
import nft5 from './nft/nft-5.png';
import nft6 from './nft/nft-6.png';
import nft7 from './nft/nft-7.png';
import nft8 from './nft/nft-8.png';
import nft9 from './nft/nft-9.png';

export const NFT_PNG_ARRAY = [nft1, nft2, nft3, nft4, nft5, nft6, nft7, nft8, nft9];

export function getRandomNFTPNG() {
  const index = Math.floor(Math.random() * 9);
  return NFT_PNG_ARRAY[index + 1];
}

export { nft1, nft2, nft3, nft4, nft5, nft6, nft7, nft8, nft9 };
