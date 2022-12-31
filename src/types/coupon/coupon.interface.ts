export interface Coupon {
    id?: string,
    title: string,
    description: string,
    link: string,
    priceText: string,
    provider: string,
    category?: string,
    subCategory?: string,
    image?: string,
    content?: string,
}
