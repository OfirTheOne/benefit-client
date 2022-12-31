
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';

import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { NavigateFunction, useNavigate } from 'react-router-dom';

interface BottomNavBarProps { }


interface NavBarButtonConfig {
    order: number;
    onClick: (navigate: NavigateFunction) => void;
    icon: JSX.Element;
}

const navBarButtonsList: Array<NavBarButtonConfig> = [
    {
        order: 1,
        onClick: (navigate: NavigateFunction) => {
            navigate('/');
        },
        icon: <HomeIcon />
    },
    {
        order: 2,
        onClick: (navigate: NavigateFunction) => {
            navigate('/search');
        },
        icon: <SearchIcon />
    },
    {
        order: 3,
        onClick: (_navigate: NavigateFunction) => { },
        icon: <BookmarkIcon />
    }
];

export const BottomNavBar: React.FC<BottomNavBarProps> = ({ }) => {
    const navigate = useNavigate();
    return <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}>
        <Toolbar>
            <Box display={'flex'} sx={{ flexGrow: 1 }} justifyContent='space-evenly'>
                {
                    navBarButtonsList
                        .sort((a, b) => a.order - b.order)
                        .map(({ onClick, icon }) => (
                            <IconButton color="inherit" aria-label="open drawer" onClick={() => onClick(navigate)}>
                                {icon}
                            </IconButton>
                        ))
                }
            </Box>
        </Toolbar>
    </AppBar>
}