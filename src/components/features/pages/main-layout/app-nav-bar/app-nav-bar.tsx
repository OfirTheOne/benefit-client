import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useAppSelector } from '../../../../../redux/root-reducer';
import { useMenuPopupContext } from '../../../../../ctx-providers/menu-popup-provider/menu-popup-provider';
import { SearchInput } from './search-input/search-input';
import { UserMenuPopup } from './user-menu-popup/user-menu-popup';


const APP_TITLE = 'Playful'

export const PrimarySearchAppBar: React.FC<{
    drawerOpen: boolean,
    drawerWidth: number,
}> = ({
    drawerOpen,
    drawerWidth
}) => {

  const { removeMenuPopup, displayMenuPopup, menuPopupState: { isShow } } = useMenuPopupContext();
  const userId = useAppSelector(root => root.authorizationState.userGuid);

  const handleProfileMenu = React.useCallback((_event: React.MouseEvent<HTMLElement>) => {
    if(userId) {
        isShow ? removeMenuPopup() : displayMenuPopup({ content: <UserMenuPopup /> });
    } else {
        removeMenuPopup()
    }

}, [isShow, userId]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky" style={drawerOpen ?  {
          marginLeft: drawerWidth,
          width: `calc(100% - ${drawerWidth}px)`,
          transition: 'width 225ms cubic-bezier(0.4, 0, 0.6, 1) 0ms,margin 225ms cubic-bezier(0.4, 0, 0.6, 1) 0ms',
          overflowX: 'hidden'
      }:{
        transition: 'width 195ms cubic-bezier(0.4, 0, 0.6, 1) 0ms,margin 195ms cubic-bezier(0.4, 0, 0.6, 1) 0ms'
      }} >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            { APP_TITLE }
          </Typography>
          <SearchInput />
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-haspopup="true"
              onClick={handleProfileMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
