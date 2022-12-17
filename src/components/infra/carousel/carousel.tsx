

import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper';
import 'swiper/css';


interface CarouselProps {
    items: Array<React.ReactElement>
}

export const Carousel: React.FC<CarouselProps> = ({
    items
}) => {
    return (
        <Swiper
            modules={[FreeMode]}
            freeMode={{
                enabled: true,
                momentum: true,
                momentumRatio: 1,
                momentumVelocityRatio: 1
            }}
            dir="rtl"
            spaceBetween={10}
            resistance={false}
            slidesPerView={2.2}
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}
        >
            {
                items.map((item) => (
                    <SwiperSlide>
                        { item }
                    </SwiperSlide>)
                )
            }
        </Swiper>
    );
};