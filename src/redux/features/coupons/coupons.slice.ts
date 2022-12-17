import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CouponsState } from '../../../types/coupon/coupon-state.interface';
import { Coupon } from '../../../types/coupon/coupon.interface';


export const initialState: CouponsState = {
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
  extraReducers: (_builder) => {
  
  },
});

export const { setSelectedCoupon, removeSelectedCoupon } = couponsSlice.actions;
export const couponsReducer = couponsSlice.reducer;
