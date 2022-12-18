import { Coupon } from "../../types/coupon/coupon.interface";


export class CouponApiAdapter {

    async getAllCoupons(): Promise<Array<Coupon>> {
        return [
            {
                link: "https://paisplus.co.il/product/18124",
                image: "https://media.dolcemaster.co.il/products/20220914093803.jpg",
                title: "פארטי פיצוץ - גלידה משפחתית במקדונלד'ס!",
                priceText: " מחיר החל מ- 18 ₪ ",
                description: "",
                provider: "1",
                category: "אחר - מזון",
            },
            {
                link: "https://paisplus.co.il/product/18124",
                image: "https://media.dolcemaster.co.il/products/20220914093803.jpg",
                title: "פארטי פיצוץ - גלידה משפחתית במקדונלד'ס!",
                priceText: " מחיר החל מ- 18 ₪ ",
                description: "",
                provider: "1",
                category: "אחר - מזון",
            },
            {
                link: "https://paisplus.co.il/product/18124",
                image: "https://media.dolcemaster.co.il/products/20220914093803.jpg",
                title: "פארטי פיצוץ - גלידה משפחתית במקדונלד'ס!",
                priceText: " מחיר החל מ- 18 ₪ ",
                description: "",
                provider: "2",
                category: "אחר - מזון",
            },
            {
                link: "https://paisplus.co.il/product/18124",
                image: "https://media.dolcemaster.co.il/products/20220914093803.jpg",
                title: "פארטי פיצוץ - גלידה משפחתית במקדונלד'ס!",
                priceText: " מחיר החל מ- 18 ₪ ",
                description: "",
                provider: "3",
                category: "אחר - מזון",
            }
            
        ]
    }
}

let couponApiAdapter: CouponApiAdapter;

export function getCouponApiAdapter(): CouponApiAdapter {
    if(!couponApiAdapter) {
        couponApiAdapter = new CouponApiAdapter();
    }
    return couponApiAdapter;
}