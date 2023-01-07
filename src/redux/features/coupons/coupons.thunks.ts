import { createAsyncThunk } from '@reduxjs/toolkit';
import { getCouponApiAdapter } from '../../../services/api-services/coupon.adapter';
import { Coupon } from '../../../types/coupon/coupon.interface';

export const fetchCouponsThunk = createAsyncThunk('fetchCoupons', async (_, { rejectWithValue }) => {
  try {
    const couponApiAdapter = getCouponApiAdapter();
    const coupons = await couponApiAdapter.getAllCoupons();
    return coupons;
  } catch (error) {
    const err = error as Error;
    return rejectWithValue(err.message);
  }
});


export const searchCouponsThunk = createAsyncThunk<
  { text: string; result: Coupon[];  total: number; }, 
  { text: string, skip: number, limit: number }
>('searchCoupons', async ({ text, skip, limit }, { rejectWithValue }) => {
  try {
    const couponApiAdapter = getCouponApiAdapter();
    const {result, total} = await couponApiAdapter.searchCoupons(text, skip, limit);
    return { text, result, total };
  } catch (error) {
    const err = error as Error;
    return rejectWithValue(err.message);
  }
});