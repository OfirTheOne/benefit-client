import React, {  } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

interface SearchResultListProps {
    items: Array<{
        image: string;
        title: string;
        subTitle: string;
        onClick: () => void;
    }>
}

export const SearchResultList: React.FC<SearchResultListProps> = ({ items }) => {
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
