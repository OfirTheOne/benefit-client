import React, { useEffect } from 'react';
import { fetchCouponsThunk } from '../../../../redux/features/coupons/coupons.thunks';
import { useAppSelector } from '../../../../redux/root-reducer';
import { useAppDispatch } from '../../../../redux/store';
import { CouponCarousel } from '../../coupon/coupon-carousel/coupon-carousel';
import { CouponDetailsDrawer } from '../../coupon/coupon-details-drawer/coupon-details-drawer';

interface Props { }

export const HomePage: React.FC<Props> = () => {
    const dispatch = useAppDispatch();
    const coupons = useAppSelector(state => state.couponsState.coupons)
    useEffect(() => {
        dispatch(fetchCouponsThunk())
    }, []);

    return (
        <div className={`HomePage`} data-testid="HomePage">
            <div style={{ margin: '60px' }} />
            <CouponCarousel style={{ marginTop: '12px', marginBottom: '8px' }} title='הפועלים' coupons={coupons}/>
            <CouponCarousel style={{ marginTop: '12px', marginBottom: '8px' }} title='הפייס' coupons={coupons}/>
            <CouponCarousel style={{ marginTop: '12px', marginBottom: '8px' }} title='Max' coupons={coupons}/>
            <CouponDetailsDrawer />
        </div>
    );
};
