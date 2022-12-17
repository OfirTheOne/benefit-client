import React, { useEffect, useState } from 'react';
import './app.scss';
import { MainLayout } from './components/features/pages/main-layout/main-layout';
import { MenuPopupProvider } from './ctx-providers/menu-popup-provider/menu-popup-provider';

export const App: React.FunctionComponent = () => {

  return (
    <div className="App" data-testid="App">
        <MenuPopupProvider>
            <MainLayout />
        </MenuPopupProvider>
    </div>
  );

};
