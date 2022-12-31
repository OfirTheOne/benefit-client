import React, { useEffect, useMemo } from 'react';
import { fetchCouponsThunk } from '../../../../redux/features/coupons/coupons.thunks';
import { useAppSelector } from '../../../../redux/root-reducer';
import { useAppDispatch } from '../../../../redux/store';
import { Coupon } from '../../../../types/coupon/coupon.interface';
import { CouponCarousel } from '../../coupon/coupon-carousel/coupon-carousel';
import { CouponDetailsDrawer } from '../../coupon/coupon-details-drawer/coupon-details-drawer';

interface Props { }

const groupKeyToDisplayName: Record<string, string> = {
    '1': 'הפועלים',
    '2': 'הפייס'
}

export const HomePage: React.FC<Props> = () => {
    const dispatch = useAppDispatch();
    const coupons = useAppSelector(state => state.couponsState.coupons)
    useEffect(() => {
        dispatch(fetchCouponsThunk())
    }, []);

    const couponsMemo = useMemo(() => {
        return coupons;
    }, [coupons])
    return (
        <div className={`HomePage`} data-testid="HomePage">
            <div style={{ margin: '60px' }} />
            {
                couponsMemo['1'] ?
                    <CouponCarousel
                        style={{ paddingRight: '8px', marginTop: '12px', marginBottom: '8px' }}
                        title={'הפועלים'}
                        coupons={couponsMemo['1'].list}
                    />
                    : <></>
            }
            {
                couponsMemo['2'] ?
                    <CouponCarousel
                        style={{ paddingRight: '8px', marginTop: '12px', marginBottom: '8px' }}
                        title={'הפייס'}
                        coupons={couponsMemo['2'].list}
                    />
                    : <></>
            }
            <CouponDetailsDrawer />
        </div>
    );
};

// const getCouponCarousel = (key: string, list: Coupon[]) => {
//     return <CouponCarousel
//         style={{ paddingRight: '8px', marginTop: '12px', marginBottom: '8px' }}
//         title={groupKeyToDisplayName?.[key] || ''}
//         coupons={list}
//     />
// }

/* 

            {
                Object.entries(couponsMemo).map(([key, value]) => 
                    <CouponCarousel 
                        key={key}
                        style={{
                            paddingRight: '8px',
                            marginTop: '12px', 
                            marginBottom: '8px' 
                        }} 
                        title={groupKeyToDisplayName?.[key] || ''} 
                        coupons={value.list}
                    />
                )
            } 
            */