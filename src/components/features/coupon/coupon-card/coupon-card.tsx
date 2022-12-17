import * as React from 'react';
import { Box, Paper, SwipeableDrawer, Typography } from '@mui/material';
import { useAppSelector } from '../../../../redux/root-reducer';
import { useCallback, useEffect } from 'react';
import { useAppDispatch } from '../../../../redux/store';
import { setSelectedCoupon, removeSelectedCoupon } from '../../../../redux/features/coupons/coupons.slice';


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
        <Typography component="h2" style={{
          fontWeight: CARD_DISPLAY.text.fontWeight,
          fontSize: CARD_DISPLAY.text.fontSize,
          color: CARD_DISPLAY.text.color,
          paddingRight: '8px',
          paddingTop: '4px'
        }} >
          {item.title}
        </Typography>
      </Box>
    </Box>
  );
}


const CouponDetailsDrawer = () => {

  const selectedCoupon = useAppSelector(state => state.couponsState.selectedCoupon);
  const dispatch = useAppDispatch();
  const [state, setState] = React.useState(false);

  useEffect(() => {
    if(selectedCoupon) {
      setState(true);
    }
    return () => setState(false);
  }, [selectedCoupon]);

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event &&
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setState(open);
  };

  const onCloseCb= useCallback((event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event &&
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }
    dispatch(removeSelectedCoupon())
    setState(false);
  }, []);

  const onOpenCb= useCallback((event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event &&
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setState(true);
  }, []);

  return (
    <SwipeableDrawer
      anchor={'bottom'}
      open={state}
      onClose={toggleDrawer(false)}
      onOpen={toggleDrawer(true)}
    >
      <CouponDetails />
    </SwipeableDrawer>
  )
}

const CouponDetails = () => {
  return (
    <Box
      width={'100vw'}
      height={'50vh'}
    >
      <Typography component="h2" style={{
        fontWeight: CARD_DISPLAY.text.fontWeight,
        fontSize: CARD_DISPLAY.text.fontSize,
      }} >
        {'title'}
      </Typography>
    </Box>
  )
}