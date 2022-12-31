import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CouponsState } from '../../../types/coupon/coupon-state.interface';
import { Coupon } from '../../../types/coupon/coupon.interface';
import { fetchCouponsThunk, searchCouponsThunk } from './coupons.thunks';


export const initialState: CouponsState = {
  coupons: {},
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
    builder
      .addCase(fetchCouponsThunk.fulfilled, (state, action) => {
        for (let couponGroup in action.payload) {
          const couponsList = action.payload[couponGroup];
          state.coupons[couponGroup] = {
            list: couponsList
          };
        }
      })
      .addCase(searchCouponsThunk.fulfilled, (state, action) => {
        state.searchResults = {
          results: action.payload.results,
          text: action.payload.text,
        };
      })
  },
});

export const { setSelectedCoupon, removeSelectedCoupon } = couponsSlice.actions;
export const couponsReducer = couponsSlice.reducer;
