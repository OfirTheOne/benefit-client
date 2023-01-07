import React, { useState, useRef } from 'react';
import './main-layout.scss';
import { Outlet } from 'react-router-dom';
import { PrimarySearchAppBar } from './app-nav-bar/app-nav-bar';
import { BottomNavBar } from './bottom-nav-bar/bottom-nav-bar';
import { CouponDetailsDrawer } from '../../coupon/coupon-details-drawer/coupon-details-drawer';


function useInitEssentialData() {

    return {
        isEssentialDataInit: true

    }
}





interface Props { }

export const MainLayout: React.FC<Props> = () => {

    const [drawerWidth, setDrawerWidth] = useState(240);
    const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
    const mainContentElementRef = useRef(null);

    return (
        <div className={`main`} data-testid="MainLayout" style={{ position: 'relative' }}>
            <PrimarySearchAppBar drawerOpen={drawerOpen} drawerWidth={drawerWidth} />
            <BottomNavBar />
            {/* <ProtectedResource>
                <AppSideNav setDrawerOpen={setDrawerOpen}  />
            </ProtectedResource> */}
            <div 
                ref={mainContentElementRef}
                className='main-content' style={{
                background: '#dce3f4',
                display: 'flex',
                flexDirection: 'column',
                marginBottom: '56px',
                height: 'calc(100hv - 112px)',
            }}>
                <Outlet />
            </div>
            <CouponDetailsDrawer />
        </div>

    );
};

