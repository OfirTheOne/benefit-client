
import * as React from 'react';
import { Box, SwipeableDrawer } from '@mui/material';
import { useAppSelector } from '../../../../redux/root-reducer';
import { useCallback, useEffect } from 'react';
import { useAppDispatch } from '../../../../redux/store';
import { removeSelectedCoupon } from '../../../../redux/features/coupons/coupons.slice';
import { Coupon } from '../../../../types/coupon/coupon.interface';
import { Typography } from '../../../infra/typography/typography';
import { TypographyContext } from '../../../infra/typography/typography-context.enum';
import { Button } from '../../../infra/button/button';

export const CouponDetailsDrawer: React.FC = () => {
  const selectedCoupon = useAppSelector(state => state.couponsState.selectedCoupon);
  const dispatch = useAppDispatch();
  const [state, setState] = React.useState(false);

  useEffect(() => {
    if (selectedCoupon) {
      setState(true);
    }
    return () => setState(false);
  }, [selectedCoupon]);

  const onCloseCb = useCallback((event: React.KeyboardEvent | React.MouseEvent) => {
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

  const onOpenCb = useCallback((event: React.KeyboardEvent | React.MouseEvent) => {
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
      {selectedCoupon ? <CouponDetails coupon={selectedCoupon} /> : null}
    </SwipeableDrawer>
  );
}

const CouponDetails: React.FC<{ coupon: Coupon }> = ({ coupon }) => {
  return (
    <Box
      width={'100vw'}
      height={'60vh'}
      display={'flex'}
      flexDirection={'column'}
    >
      <Box display={'flex'} flexDirection={'row'}>
        <Box display={'flex'} margin={'12px'} >
          <Button
            onClick={() => window.open(coupon.link, '_blank', 'noreferrer')}
            size='big'
            label={'Link'}
          />
        </Box>
        <Box display={'flex'} flexDirection={'column'} style={{ direction: 'rtl', marginRight: '12px' }}>
          <Box display={'flex'} >
            <Typography text={coupon.title} context={TypographyContext.detailsDrawerTitle} />
          </Box>
          <Box display={'flex'} >
            <Typography text={coupon.priceText} context={TypographyContext.detailsDrawerSubtitle} />
          </Box>
        </Box>
      </Box>

      <Box display={'flex'} >
        <img
          style={{
            marginTop: '20px',
            padding: '12px',
            width: '100vw',
            height: 'auto'
          }}
          src={coupon.image}
        />
      </Box>
    </Box>
  )
}