
import * as React from 'react';
import { Typography } from '@mui/material';
import Box from '@mui/system/Box';
import { Carousel } from '../../../infra/carousel/carousel';
import { Coupon } from '../../../../types/coupon/coupon.interface';
import { CouponCard } from '../coupon-card/coupon-card';


interface CouponCarouselProps {
    coupons: Coupon[];
    title: string;
    style?: React.CSSProperties;
}

export const CouponCarousel: React.FC<CouponCarouselProps> = (
    { coupons, title, style }
) => {
    const items = coupons.map(c => <CouponCard key={c.id} coupon={c} />);

    return (
        <Box 
            style={style}
            display='flex' rowGap='8px' flexDirection='column' 
        >
            <Box display='flex' style={{ 
                direction: 'rtl' 
            }} >  
                <Typography component="h2" style={{ 
                    fontWeight: 600,
                    fontSize: '1.2rem',
                }} >
                    { title }
                </Typography>
            </Box>
            <Box  display='flex'>
                <Carousel items={items} />
            </Box>
        </Box>

    );
}