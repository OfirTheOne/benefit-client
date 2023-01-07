import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { useAppSelector } from '../../../../redux/root-reducer';
import { useAppDispatch } from '../../../../redux/store';


import List from '@mui/material/List';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { setSelectedCoupon } from '../../../../redux/features/coupons/coupons.slice';

interface Props { }


export const SearchResultPage: React.FC<Props> = () => {
    const coupons = useAppSelector(state => state.couponsState.searchResults);
    const dispatch = useAppDispatch();

    const couponsListElement = useMemo(() => {
        return coupons?.results.length ?
            <AlignItemsList items={
                coupons.results.map((coupon) => ({
                    title: coupon.title,
                    image: coupon.image || '',
                    subTitle: coupon.priceText,
                    onClick: () => { dispatch(setSelectedCoupon(coupon)) }
                }))
            } /> :
            <></>;
    }, [coupons])

    return <div
        style={{ height: 'inherit', overflowY: 'scroll' }}
        onScroll={(e) => {
            const scrollParameters = extractScrollParameters(e.target as HTMLDivElement);
            // scrollParameters.
            console.log(scrollParameters);
        }}>
        {couponsListElement}
    </div>
}

interface AlignItemsListProps {
    items: Array<{
        image: string;
        title: string;
        subTitle: string;
        onClick: () => void;
    }>
}

export const AlignItemsList: React.FC<AlignItemsListProps> = ({ items }) => {
    return (
        <List sx={{
            width: '100%', bgcolor: '#dce3f4',
            display: 'flex',
            flexDirection: 'column'
        }}>
            {
                items.map((item, i) => (
                    <ListItem key={`${item.title}-${i}`} dir={'rtl'}
                        style={{
                            alignSelf: 'center',
                            width: '95vw',
                            paddingLeft: 0,
                            paddingRight: 0,
                            background: '#dce3f4',
                            justifyContent: 'center',
                        }}
                        onClick={item.onClick}
                        alignItems="flex-start">
                        <Button style={{
                            boxShadow: 'rgb(0 0 0 / 5%) 0px 2px 25px',
                            background: '#fff',
                            textAlign: 'initial',
                            paddingBottom: '4px',
                            paddingTop: '4px',
                            marginRight: '4px',
                            marginLeft: '4px',
                            width: '100%'
                        }}

                            variant="text">
                            <ListItemAvatar style={{ marginLeft: '12px' }}>
                                <Avatar
                                    style={{ width: '64px', height: '64px' }}
                                    alt={item.title}
                                    src={item.image}
                                />
                            </ListItemAvatar>
                            <ListItemText
                                primary={item.title}
                                secondary={
                                    <React.Fragment>
                                        <Typography
                                            sx={{ display: 'inline' }}
                                            component="span"
                                            variant="body2"
                                            color="text.primary"
                                        >
                                            {item.subTitle}
                                        </Typography>
                                    </React.Fragment>
                                }
                            />
                        </Button>
                    </ListItem>
                ))
            }
        </List>
    );
}

export const extractScrollParameters = (target: HTMLDivElement) => {
    const offsetHeight = target.offsetHeight;
    const scrollTop = target.scrollTop;
    const offsetTop = target.offsetTop;
    const scrollHeight = target.scrollHeight;

    return {
        offsetHeight,
        scrollTop,
        offsetTop,
        scrollHeight
    };
}