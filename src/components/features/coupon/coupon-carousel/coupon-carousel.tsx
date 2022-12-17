
import * as React from 'react';
import { Paper, Typography } from '@mui/material';
import Box from '@mui/system/Box';
import { Carousel } from '../../../infra/carousel/carousel';


interface CouponCarouselProps {
    items: Array<React.ReactElement>;
    title: string;
    style?: React.CSSProperties;
}

export const CouponCarousel: React.FC<CouponCarouselProps> = (
    { items, title, style }
) => {
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