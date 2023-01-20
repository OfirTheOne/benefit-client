import { Coupon } from "../../types/coupon/coupon.interface";
import { getHttpService } from "./../http-service/http.service";

const host = window.location.host.split(':')[0];

export class CouponApiAdapter {

    baseurl = `http://${host}:3000/api/`
    async getAllCoupons(): Promise<Record<string, Coupon[]>> {
        const url = `${this.baseurl}coupons`;
        const resultProviderOne = await getHttpService().get<Coupon[]>(`${url}/1`);
        const resultProviderTow = await getHttpService().get<Coupon[]>(`${url}/2`);
        const resultProviderThree = await getHttpService().get<Coupon[]>(`${url}/3`);
        return {
            ['1']: resultProviderOne.data,
            ['2']: resultProviderTow.data,
            ['3']: resultProviderThree.data,
        };
    }

    async searchCoupons(text: string, skip: number, limit: number): Promise<{ 
        result: Coupon[],
        total: number,
    }> {
        const url = `${this.baseurl}coupons/search`;
        const result = await getHttpService().get<{ result: Coupon[], total: number }>(`${url}`, { params: { text, skip, limit }});
        return result.data;
    }
}

let couponApiAdapter: CouponApiAdapter;

export function getCouponApiAdapter(): CouponApiAdapter {
    if(!couponApiAdapter) {
        couponApiAdapter = new CouponApiAdapter();
    }
    return couponApiAdapter;
}


/*

        return [
            {
                "id": "coupon:7fd239e3-5aee-433a-94c1-d31e94d599ee",
                "link": "https://www.bankhapoalim.co.il/he/Poalim-Wonder/Shopping",
                "image": "https://www.bankhapoalim.co.il/sites/default/files/styles/large/public/media/wonder%20hatavot%20images/adidas1.png",
                "title": "אדידס",
                "priceText": "שובר בשווי 300 ₪\nתמורת 219.00 ₪ + 25 נקודות",
                "description": "",
                "provider": "1",
                "category": "שופינג"
            },
            {
                "id": "coupon:b0af28ae-a7c0-45c0-8d07-61c58e0d7fdf",
                "link": "https://www.bankhapoalim.co.il/he/Poalim-Wonder/Shopping",
                "image": "https://www.bankhapoalim.co.il/sites/default/files/styles/large/public/media/DohotKaspiem/%D7%9E%D7%92%D7%94%20%D7%A1%D7%A4%D7%95%D7%A8%D7%98.jpg",
                "title": "רשת מגה ספורט",
                "priceText": "שובר בשווי 200 ₪\nתמורת 149.00 ₪ + 20 נקודות",
                "description": "",
                "provider": "1",
                "category": "שופינג"
            },
            {
                "id": "coupon:cf1ee1a0-969a-4405-afb5-97a5979c484e",
                "link": "https://www.bankhapoalim.co.il/he/Poalim-Wonder/Shopping",
                "image": "https://www.bankhapoalim.co.il/sites/default/files/styles/large/public/media/wonder%20hatavot%20images/sano.png",
                "title": "סנו",
                "priceText": "מארז 8 מוצרי ניקיון\nתמורת 69.00 ₪ + 30 נקודות",
                "description": "",
                "provider": "1",
                "category": "שופינג"
            },
            {
                "id": "coupon:656fa248-7956-4283-96e0-85c985d51e2a",
                "link": "https://www.bankhapoalim.co.il/he/Poalim-Wonder/Shopping",
                "image": "https://www.bankhapoalim.co.il/sites/default/files/styles/large/public/media/campaigns/wonder/%D7%91%D7%99%D7%AA%D7%9F.jpg",
                "title": "קבוצת ביתן",
                "priceText": "שובר בשווי 300 ₪\nתמורת 249.00 ₪ + 25 נקודות\n",
                "description": "",
                "provider": "1",
                "category": "שופינג"
            },
            {
                "id": "coupon:9119f2ad-d032-41f1-a789-fcb1611464a3",
                "link": "https://www.bankhapoalim.co.il/he/Poalim-Wonder/Shopping",
                "image": "https://www.bankhapoalim.co.il/sites/default/files/styles/large/public/media/wonder%20hatavot%20images/love_gift.png",
                "title": "LOVE GIFT CARD",
                "priceText": "שובר בשווי 300 ₪\nתמורת 219.00 ₪ + 25 נקודות",
                "description": "",
                "provider": "1",
                "category": "שופינג"
            },
            {
                "id": "coupon:9e9b9dc3-6441-41a7-87cf-f8b1543a221e",
                "link": "https://www.bankhapoalim.co.il/he/Poalim-Wonder/Shopping",
                "image": "https://www.bankhapoalim.co.il/sites/default/files/styles/large/public/media/wonder%20hatavot%20images/castro11.png",
                "title": "קסטרו ",
                "priceText": "שובר בשווי 300 ₪\nתמורת 219.00 ₪ + 25 נקודות",
                "description": "",
                "provider": "1",
                "category": "שופינג"
            },
            {
                "id": "coupon:888c1f32-6c7b-43a2-9ee3-98b6454ae635",
                "link": "https://www.bankhapoalim.co.il/he/Poalim-Wonder/Shopping",
                "image": "https://www.bankhapoalim.co.il/sites/default/files/styles/large/public/media/wonder%20hatavot%20images/castro1.png",
                "title": "קסטרו הום",
                "priceText": "שובר בשווי 300 ₪\nתמורת 219.00 ₪ + 25 נקודות",
                "description": "",
                "provider": "1",
                "category": "שופינג"
            },
            {
                "id": "coupon:f487616a-aa0f-4848-9fba-1852dfad5ee2",
                "link": "https://www.bankhapoalim.co.il/he/Poalim-Wonder/Shopping",
                "image": "https://www.bankhapoalim.co.il/sites/default/files/styles/large/public/media/campaigns/wonder/bubbles.jpg",
                "title": "רשת באבלס בפריסה ארצית",
                "priceText": "שטיפה פנימית וחיצונית לרכב פרטי\nתמורת 25.00 ₪ + 20 נקודות",
                "description": "",
                "provider": "1",
                "category": "שופינג"
            },
            {
                "id": "coupon:5151e41b-a660-4f3b-88b0-3a5b74c6aef2",
                "link": "https://www.bankhapoalim.co.il/he/Poalim-Wonder/Shopping",
                "image": "https://www.bankhapoalim.co.il/sites/default/files/styles/large/public/media/campaigns/wonder/360x280.jpg",
                "title": "איל מקיאג'",
                "priceText": "שובר בשווי 100 ₪\nתמורת 59.00 ₪ + 25 נקודות",
                "description": "",
                "provider": "1",
                "category": "שופינג"
            },
            {
                "id": "coupon:74cb33a6-2e95-4453-8d41-dcebf0642915",
                "link": "https://www.bankhapoalim.co.il/he/Poalim-Wonder/Shopping",
                "image": "https://www.bankhapoalim.co.il/sites/default/files/styles/large/public/media/wonder%20hatavot%20images/soho.png",
                "title": "SOHO",
                "priceText": "שובר בשווי 200 ₪\nתמורת 129.00 ₪ + 25 נקודות",
                "description": "",
                "provider": "1",
                "category": "שופינג"
            },
            {
                "id": "coupon:9aed7b1e-2ff7-4533-8f44-532afdd4f145",
                "link": "https://www.bankhapoalim.co.il/he/Poalim-Wonder/Shopping",
                "image": "https://www.bankhapoalim.co.il/sites/default/files/styles/large/public/media/wonder%20hatavot%20images/zer4u.png",
                "title": "רשת ZER4U",
                "priceText": "שובר בשווי 150 ₪\nתמורת 100.00 ₪ + 25 נקודות",
                "description": "",
                "provider": "1",
                "category": "שופינג"
            },
            {
                "id": "coupon:daf88787-93ba-4b11-82a0-aef758ada76d",
                "link": "https://www.bankhapoalim.co.il/he/Poalim-Wonder/Shopping",
                "image": "https://www.bankhapoalim.co.il/sites/default/files/styles/large/public/media/wonder%20hatavot%20images/tivtaam.png",
                "title": "רשת טיב טעם",
                "priceText": "שובר בשווי 100 ₪\nתמורת 60.00 ₪ + 25 נקודות",
                "description": "",
                "provider": "1",
                "category": "שופינג"
            },
            {
                "id": "coupon:c5bd3521-bd89-44d1-91b2-c5953313505d",
                "link": "https://www.bankhapoalim.co.il/he/Poalim-Wonder/Shopping",
                "image": "https://www.bankhapoalim.co.il/sites/default/files/styles/large/public/media/wonder%20hatavot%20images/top10.png",
                "title": "טופ טן",
                "priceText": "שובר בשווי 300 ₪\nתמורת 219.00 ₪ + 25 נקודות",
                "description": "",
                "provider": "1",
                "category": "שופינג"
            },
            {
                "id": "coupon:49e4ada7-adba-49dc-ace5-6e5037dcc6c9",
                "link": "https://www.bankhapoalim.co.il/he/Poalim-Wonder/Shopping",
                "image": "https://www.bankhapoalim.co.il/sites/default/files/styles/large/public/media/wonder%20hatavot%20images/castrohome.png",
                "title": "קסטרו הום",
                "priceText": "שובר בשווי 150 ₪\nתמורת 99.00 ₪ + 25 נקודות",
                "description": "",
                "provider": "1",
                "category": "שופינג"
            },
            {
                "id": "coupon:ec4dadfd-45ba-463a-8d47-68d5acf0fad5",
                "link": "https://www.bankhapoalim.co.il/he/Poalim-Wonder/Shopping",
                "image": "https://www.bankhapoalim.co.il/sites/default/files/styles/large/public/media/wonder%20hatavot%20images/castro150.png",
                "title": "קסטרו",
                "priceText": "שובר בשווי 150 ₪\nתמורת 99.00 ₪ + 25 נקודות",
                "description": "",
                "provider": "1",
                "category": "שופינג"
            },
            {
                "id": "coupon:b9d6f30d-0adb-4a4d-acf0-347cba56862c",
                "link": "https://www.bankhapoalim.co.il/he/Poalim-Wonder/Shopping",
                "image": "https://www.bankhapoalim.co.il/sites/default/files/styles/large/public/media/wonder%20hatavot%20images/hoodies150.png",
                "title": "הודיס",
                "priceText": "שובר בשווי 150 ₪\nתמורת 99.00 ₪ + 25 נקודות",
                "description": "",
                "provider": "1",
                "category": "שופינג"
            },
            {
                "id": "coupon:6a9119bf-1952-418a-a62f-ac728c77e783",
                "link": "https://www.bankhapoalim.co.il/he/Poalim-Wonder/Shopping",
                "image": "https://www.bankhapoalim.co.il/sites/default/files/styles/large/public/media/wonder%20hatavot%20images/urbanica150.png",
                "title": "אורבניקה",
                "priceText": "שובר בשווי 150 ₪\nתמורת 99.00 ₪ + 25 נקודות",
                "description": "",
                "provider": "1",
                "category": "שופינג"
            },
            {
                "id": "coupon:99263287-f0e5-4eb2-9b08-6c40a5764240",
                "link": "https://www.bankhapoalim.co.il/he/Poalim-Wonder/Shopping",
                "image": "https://www.bankhapoalim.co.il/sites/default/files/styles/large/public/media/wonder%20hatavot%20images/adidas150.png",
                "title": "אדידס",
                "priceText": "שובר בשווי 150 ₪\nתמורת 99.00 ₪ + 25 נקודות",
                "description": "",
                "provider": "1",
                "category": "שופינג"
            },
            {
                "id": "coupon:28143cba-9330-4f1b-883f-6e33d38d0f4d",
                "link": "https://www.bankhapoalim.co.il/he/Poalim-Wonder/Shopping",
                "image": "https://www.bankhapoalim.co.il/sites/default/files/styles/large/public/media/wonder%20hatavot%20images/topten150.png",
                "title": "טופ טן",
                "priceText": "שובר בשווי 150 ₪\nתמורת 99.00 ₪ + 25 נקודות",
                "description": "",
                "provider": "1",
                "category": "שופינג"
            },
            {
                "id": "coupon:3125adec-00bb-4be7-8b6c-d37a1ecaafb9",
                "link": "https://www.bankhapoalim.co.il/he/Poalim-Wonder/Shopping",
                "image": "https://www.bankhapoalim.co.il/sites/default/files/styles/large/public/media/wonder%20hatavot%20images/carolina.png",
                "title": "קרולינה למקה",
                "priceText": "שובר בשווי 150 ₪\nתמורת 99.00 ₪ + 25 נקודות",
                "description": "",
                "provider": "1",
                "category": "שופינג"
            }
        ]

*/