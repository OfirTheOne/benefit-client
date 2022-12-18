import * as React from 'react';
import { Box } from '@mui/material';
import { useAppDispatch } from '../../../../redux/store';
import { setSelectedCoupon } from '../../../../redux/features/coupons/coupons.slice';
import { Typography } from '../../../infra/typography/typography';
import { TypographyContext } from '../../../infra/typography/typography-context.enum';


interface CouponCardProps {

}


const CARD_DISPLAY = {
  width: '162px',
  height: '128px',
  text: {
    background: '#3a3a3a',
    color: 'white',
    fontSize: '0.8rem',
    fontWeight: 600,
  }
}

export const CouponCard: React.FC<CouponCardProps> = () => {
  const dispatch = useAppDispatch();

  const item = {
    link: "https://paisplus.co.il/product/18124",
    image: "https://media.dolcemaster.co.il/products/20220914093803.jpg",
    title: "פארטי פיצוץ - גלידה משפחתית במקדונלד'ס!",
    priceText: " מחיר החל מ- 18 ₪ ",
    description: "",
    provider: "2",
    category: "אחר - מזון",
  };

  return (
    <Box
      width={CARD_DISPLAY.width}
      height={CARD_DISPLAY.height}
      style={{
        position: 'relative',
        borderRadius: '8px'
      }}
      onClick={() => dispatch(setSelectedCoupon(item))}
    >
      <img src={item.image}
        width={CARD_DISPLAY.width}
        height={CARD_DISPLAY.height}
        style={{
          borderRadius: '8px'
        }}
      />

      <Box
        width={CARD_DISPLAY.width}
        height={'50px'}
        style={{
          bottom: 0,
          position: 'absolute',
          background: CARD_DISPLAY.text.background,
          borderBottomLeftRadius: '8px',
          borderBottomRightRadius: '8px',
        }}
      >
        <Typography text={item.title} context={TypographyContext.sliderCardTitle} style={{
          color: CARD_DISPLAY.text.color,
          paddingRight: '8px',
          paddingTop: '4px'
        }} />

      </Box>
    </Box>
  );
}