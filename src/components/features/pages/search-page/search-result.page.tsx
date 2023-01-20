import React, { useCallback, useMemo, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { config } from '../../../../config/config';
import { useAppDispatch } from '../../../../redux/store';
import { useAppSelector } from '../../../../redux/root-reducer';
import { setSelectedCoupon } from '../../../../redux/features/coupons/coupons.slice';
import { searchCouponsThunk } from '../../../../redux/features/coupons/coupons.thunks';
import { SearchResultList } from './search-result-list';

interface Props { }

const SEARCH_RESULT_DIV_ID = 'scrollableDiv';

export const SearchResultPage: React.FC<Props> = () => {
    const searchResults = useAppSelector(state => state.couponsState.searchResults);
    const dispatch = useAppDispatch();
    const [page, setPage] = useState(1);

    const fetchCouponsCb = useCallback(async () => {
        const limit = config.searchPageSize;
        const skip = page * config.searchPageSize;
        await dispatch(searchCouponsThunk({ text: searchResults?.text || '', limit, skip }));
        setPage(page + 1);
    }, [page, searchResults]);

    const couponsListElement = useMemo(() => {
        return searchResults?.result?.length ?
            <SearchResultList items={
                searchResults.result.map((coupon) => ({
                    title: coupon.title,
                    image: coupon.image || '',
                    subTitle: coupon.priceText,
                    onClick: () => { dispatch(setSelectedCoupon(coupon)) }
                }))} /> :
            <></>;
    }, [searchResults])

    return (<div
        id={SEARCH_RESULT_DIV_ID}
        style={{ height: '100%', overflowY: 'scroll' }}>
        <InfiniteScroll
            dataLength={(page + 1) * config.searchPageSize}
            next={fetchCouponsCb}
            hasMore={!!searchResults && (searchResults.total > searchResults.result.length)}
            loader={null}
            scrollableTarget={SEARCH_RESULT_DIV_ID}
        > {couponsListElement} </InfiniteScroll>
    </div>);
}
