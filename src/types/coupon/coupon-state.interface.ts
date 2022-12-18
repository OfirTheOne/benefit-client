import { Coupon } from "./coupon.interface";

export interface CouponsState {
    selectedCoupon?: Coupon;
    coupons: Array<Coupon>;
}
  