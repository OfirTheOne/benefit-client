import { createAsyncThunk } from '@reduxjs/toolkit';
import { getCouponApiAdapter } from '../../../services/api-services/coupon.adapter';

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
  