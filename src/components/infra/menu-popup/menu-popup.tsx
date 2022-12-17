
import React from "react";
import "./menu-popup.scss";

interface MenuPopupProps {
    position?: 'left' | 'right';
    height?: React.CSSProperties['height'];
    show?: boolean
}
export const MenuPopup: React.FC<React.PropsWithChildren<MenuPopupProps>> = ({ position = 'right', height, children, show = true }) => {
    return <div
        className={`menu-popup ${position} ${show ? 'show' : ''}`}
        style={{ height }}>
        {children}
    </div>;
}
