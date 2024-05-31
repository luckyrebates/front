import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Scrollbar } from 'swiper/modules';
import {
  LidoBanner,
  LuckyTaskIntroduceBanner,
  CrossChainCheckInBanner,
  UniSwapBanner,
  DEXSignUpBanner,
} from '@src/image/banner';

export function Banner() {
  return (
    <div className="r_banner">
      <Swiper
        modules={[Autoplay, Pagination, Scrollbar]}
        autoplay={{ delay: 3000 }}
        spaceBetween={0}
        speed={5000}
        slidesPerView={1}
        loop={true}
        pagination={{ clickable: true }}
      >
        <SwiperSlide>
          <LuckyTaskIntroduceBanner />
        </SwiperSlide>
        <SwiperSlide>
          <LidoBanner />
        </SwiperSlide>
        <SwiperSlide>
          <CrossChainCheckInBanner />
        </SwiperSlide>
        <SwiperSlide>
          <DEXSignUpBanner />
        </SwiperSlide>
        <SwiperSlide>
          <UniSwapBanner />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
