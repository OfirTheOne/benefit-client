import React, {  } from 'react';
import { Carousel } from '../../../infra/carousel/carousel';
import { CouponCard } from "../../coupon/coupon-card/coupon-card";
import { CouponCarousel } from '../../coupon/coupon-carousel/coupon-carousel';
import { CouponDetailsDrawer } from '../../coupon/coupon-details-drawer/coupon-details-drawer';

interface Props { }

export const HomePage: React.FC<Props> = () => {
    const items = (new Array(20)).fill(<CouponCard/>);

    return (
        <div className={`HomePage`} data-testid="HomePage">
            <div style={{ margin: '60px' }} />
            <CouponCarousel style={{ marginTop: '12px', marginBottom: '8px' }} title='הפועלים' items={items}/>
            <CouponCarousel style={{ marginTop: '12px', marginBottom: '8px' }} title='הפייס' items={items}/>
            <CouponCarousel style={{ marginTop: '12px', marginBottom: '8px' }} title='Max' items={items}/>
            <CouponDetailsDrawer />
        </div>
    );
};
