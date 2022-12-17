import React, { useEffect, useState } from 'react';
import './main-layout.scss';
import { useAppDispatch } from '../../../../redux/store';
import { useAppSelector } from '../../../../redux/root-reducer';
import { Outlet } from 'react-router-dom';
import { AppSideNav } from './app-side-nav/app-side-nav';
import { PrimarySearchAppBar } from './app-nav-bar/app-nav-bar';
import { ProtectedResource } from '../../../shared/protected-resource/protected-resource';


function useInitEssentialData() {

    return {
        isEssentialDataInit: true
           
    }
}


interface Props { }

export const MainLayout: React.FC<Props> = () => {

    const [drawerWidth, setDrawerWidth] = useState(240);
    const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

    return (
        <div className={`main`} data-testid="MainLayout" style={{ position: 'relative' }}>
            <PrimarySearchAppBar drawerOpen={drawerOpen} drawerWidth={drawerWidth}/>
            {/* <ProtectedResource>
                <AppSideNav setDrawerOpen={setDrawerOpen}  />
            </ProtectedResource> */}
            <div className='main-content'>
                <Outlet />                            
            </div>
        </div>

    );
};

