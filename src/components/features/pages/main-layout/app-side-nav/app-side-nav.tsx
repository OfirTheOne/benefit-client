
import React, { useCallback, useEffect } from 'react';
import { SideNav, SideNavItem } from '../../../../infra/side-nav/side-nav';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../../../redux/root-reducer';
import { useMenuPopupContext } from '../../../../../ctx-providers/menu-popup-provider/menu-popup-provider';
import { JwtUserRoles, Role } from '../../../../../types/jwt-data';
import Paper from '@mui/material/Paper';
import { LogoutButton } from '../../../../shared/logout-button/logout-button';
import { NavItem } from '../../../../infra/nav-bar/nav-bar';

import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import HomeIcon from '@mui/icons-material/Home';


const UserMenuPopup: React.FC = () => {
    const userName = useAppSelector(root => root.authorizationState.userName);
    const userId = useAppSelector(root => root.authorizationState.userGuid);
    return (
        <Paper sx={{ width: '100%', backgroundColor: '#f3f3f3' }}>
            <div style={{ 
                padding: '20px',
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'space-between', 
                height: '100%' 
            }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div> userName : {userName} </div>
                    <div> userId : {userId} </div>
                </div>
                <div style={{ display: 'flex' }}> <LogoutButton /> </div>
            </div>
        </Paper>

    );
}


interface NavItemRolesMap {
    [key: string]: {roles: Role[]}
}

const navItemRoleMap: NavItemRolesMap = {
    ['01']: {roles: (['PLAYER', 'SUPERVISOR'] as Role[])},
    ['02']: {roles: (['PLAYER', 'SUPERVISOR'] as Role[])},
    ['03']: {roles: (['PLAYER', 'SUPERVISOR'] as Role[])},
    ['04']: {roles: (['SUPERVISOR'] as Role[])},
}

function isNavItemAllowed(item: NavItem, userRoles: JwtUserRoles | null, navItemRoleMap: NavItemRolesMap) {
    return navItemRoleMap[item.id]?.roles.some(r => userRoles?.user?.includes(r) )
}



export const AppSideNav: React.FC<{
    setDrawerOpen: (open: boolean) => void
}> = ({
    setDrawerOpen
}) => {
    const { removeMenuPopup, displayMenuPopup, menuPopupState: { isShow } } = useMenuPopupContext();
    const userId = useAppSelector(root => root.authorizationState.userGuid);
    const roles = useAppSelector(root => root.authorizationState.userJWTRoles);
    let location = useLocation();
    const navigate = useNavigate();

    const onNavItemClick = useCallback((navItem: SideNavItem) => {
        if(navItem.route) {
            navigate(navItem.route); 
        }
    }, [navigate]);

    useEffect(() => {
        if(!userId && isShow) {
            removeMenuPopup();
        }
    }, [userId, isShow]);
    const handleUserMenu = useCallback(() => {
        if(userId) {
            isShow ? removeMenuPopup() : displayMenuPopup({ content: <UserMenuPopup /> });
        }
    }, [isShow, userId]);

    const navTitle = "Speak To Play";
    const navItems = [
        {
            displayName: 'Home',
            route: '/home',
            icon: <HomeIcon />,
            id: '01',
        },
        {
            displayName: 'Games',
            route: '/games',
            icon: <SportsEsportsIcon />,
            id: '02',
        },
        {
            displayName: 'Reward Center',
            route: '/reward-center',
            // icon: 
            id: '03',
        },
        {
            displayName: 'Challenges',
            route: '/challenges',
            icon: <WorkspacePremiumIcon />,
            id: '04',
        }
    ].filter(item => isNavItemAllowed(item, roles, navItemRoleMap));
    
    const selectedId = navItems.find(({ route }) => location.pathname.startsWith(route) )?.id;
    const allowedNavItems = navItems.filter(item => isNavItemAllowed(item, roles, navItemRoleMap));

    return (<SideNav 
            // title={navTitle} 
            onDrawerOpen={setDrawerOpen}
            onNavItemClick={onNavItemClick}
            items={allowedNavItems} 
            selectedId={selectedId}
        />);
};

