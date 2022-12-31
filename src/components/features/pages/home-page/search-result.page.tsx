import React, { useEffect } from 'react';
import { useAppSelector } from '../../../../redux/root-reducer';
import { useAppDispatch } from '../../../../redux/store';


import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

interface Props { }

export const SearchResultPage: React.FC<Props> = () => {
    const coupons = useAppSelector(state => state.couponsState.searchResults);
    const dispatch = useAppDispatch();
    useEffect(() => {
        // dispatch(searchCouponsThunk());
    }, []);

    return coupons?.results.length ?
        <AlignItemsList items={
            coupons.results.map(({ title, image = '', priceText }) => ({ title, image, subTitle: priceText }))
        } /> :
        <></>;
}

interface AlignItemsListProps {
    items: Array<{
        image: string;
        title: string;
        subTitle: string;
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