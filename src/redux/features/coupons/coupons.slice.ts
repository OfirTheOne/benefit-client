import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CouponsState } from '../../../types/coupon/coupon-state.interface';
import { Coupon } from '../../../types/coupon/coupon.interface';
import { fetchCouponsThunk } from './coupons.thunks';


export const initialState: CouponsState = {
  coupons: []
};

const couponsSlice = createSlice({
  name: 'coupons',
  initialState,
  reducers: {
    setSelectedCoupon(state, action: PayloadAction<Coupon>) {
      state.selectedCoupon = action.payload;
    },
    removeSelectedCoupon(state) {
      state.selectedCoupon = undefined;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCouponsThunk.fulfilled, (state, action) => {
      state.coupons = action.payload;
    })
  },
});

export const { setSelectedCoupon, removeSelectedCoupon } = couponsSlice.actions;
export const couponsReducer = couponsSlice.reducer;
