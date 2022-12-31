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


export const searchCouponsThunk = createAsyncThunk<{ text: string; results: Coupon[]; }, { text: string }>('searchCoupons', async ({ text }, { rejectWithValue }) => {
  try {
    const couponApiAdapter = getCouponApiAdapter();
    const coupons = await couponApiAdapter.searchCoupons(text);
    return { text, results: coupons };
  } catch (error) {
    const err = error as Error;
    return rejectWithValue(err.message);
  }
});