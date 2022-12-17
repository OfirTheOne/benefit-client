
import * as React from 'react';
import { Box, SwipeableDrawer, Typography } from '@mui/material';
import { useAppSelector } from '../../../../redux/root-reducer';
import { useCallback, useEffect } from 'react';
import { useAppDispatch } from '../../../../redux/store';
import { removeSelectedCoupon } from '../../../../redux/features/coupons/coupons.slice';



export const CouponDetailsDrawer = () => {

    const selectedCoupon = useAppSelector(state => state.couponsState.selectedCoupon);
    const dispatch = useAppDispatch();
    const [state, setState] = React.useState(false);
  
    useEffect(() => {
      if(selectedCoupon) {
        setState(true);
      }
      return () => setState(false);
    }, [selectedCoupon]);
  
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
        onClose={onCloseCb}
        onOpen={onOpenCb}
      >
        <CouponDetails />
      </SwipeableDrawer>
    )
  }
  
  const CouponDetails = () => {
    return (
      <Box
        width={'100vw'}
        height={'60vh'}
      >
        <Typography component="h2" style={{
            fontSize: '0.8rem',
            fontWeight: 600,
        }} >
          {'title'}
        </Typography>
      </Box>
    )
  }