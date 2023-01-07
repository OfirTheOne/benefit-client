import { Coupon } from "./coupon.interface";

export interface CouponsState {
    selectedCoupon?: Coupon;
    coupons: {
        [group: string]: {
            list : Array<Coupon>;
        }
    },
    searchResults?: {
        total: number;
        text: string;
        result: Array<Coupon>;
    }
}
  