import { noop } from 'lodash';
import React, { createContext, useState, useContext, useCallback } from 'react';
import { MenuPopup } from '../../components/infra/menu-popup/menu-popup';
import { MenuPopupCtx, MenuPopupState } from './types';


const defaultMenuPopupState: MenuPopupState = {
    isShow: false,
    menuPopupContent: <></>
};

export const MenuPopupContext = createContext<MenuPopupCtx>({
    removeMenuPopup: noop,
    displayMenuPopup: noop,
    menuPopupState: defaultMenuPopupState,
});

export const useMenuPopupContext = () => useContext(MenuPopupContext);

export const MenuPopupProvider: React.FC<any> = ({ children }) => {
    const [menuPopupState, setModalState] = useState<MenuPopupState>(defaultMenuPopupState);

    const displayMenuPopup = useCallback((action: { content: React.ReactElement }) => {
        setModalState({
            isShow: true,
            menuPopupContent: action.content,
        });
    }, [menuPopupState]);
    const removeMenuPopup = useCallback(() => {
        setModalState({ 
            isShow: false,
            menuPopupContent: <></>,
        });
    }, [menuPopupState]);

    const Provider = MenuPopupContext.Provider;
    return (<Provider value={{ menuPopupState, displayMenuPopup, removeMenuPopup }}>
        <MenuPopup show={menuPopupState.isShow }>
            { menuPopupState.menuPopupContent }
        </MenuPopup>
        {children}
    </Provider>);
};