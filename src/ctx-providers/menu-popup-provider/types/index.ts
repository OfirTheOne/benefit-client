import React from 'react';


export interface MenuPopupState {
    isShow: boolean;
    menuPopupContent: React.ReactElement;
}

export interface MenuPopupCtx {
    removeMenuPopup: () => void;
    displayMenuPopup: (action: {
        content: React.ReactElement
    }) => void;
    menuPopupState: MenuPopupState;
}
