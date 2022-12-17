import React from "react";
import "./nav-bar.scss";
import { Icon, IconProps } from "../icon/icon";
import { Link } from "react-router-dom";
import { Input } from "../input/input";
// import { useHistory } from "react-router";
// import { useHistory } from "react-router-dom";


export interface NavItem {
    displayName: string;
    route: string;
    id: string
}

interface NavIconItem {
    srcPath: string;
}

interface NavBarProps {
    title?: string;
    items?: NavItem[];
    icons?: (React.ReactNode | NavIconItem)[];
    selectedId?: string;
}

function isNavIconItem(o: unknown): o is NavIconItem {
    return (typeof o == 'object') &&
        (o !== null) &&
        ('srcPath' in o) &&
        (o as NavIconItem).srcPath !== undefined;

}

export const NavBar: React.FC<NavBarProps> = ({
    title,
    items = [],
    icons = [],
    selectedId
}) => {

    return <nav className="NavBar nav-bar">
        <div className="align-start-container">
            <div className="nav-title-container">
                <span>
                    {title}
                </span>
            </div>
            <div className="nav-logo-container">
                <img src="/logo.png" height={'60px'} />
            </div>
        </div>

        <div className="align-end-container">
            <div className="nav-search-container">
                <Input />
            </div>

            <div className="nav-items-container">
                {items.map(navItem =>
                    <div className={`nav-item ${navItem.id === selectedId ? 'selected' : ''}`}>
                        <span>
                            <Link to={navItem.route}>
                                {navItem.displayName}
                            </Link>
                        </span>
                    </div>)}
            </div>
            <div className="icon-items-container">
                {
                    icons.map(icon =>
                        !isNavIconItem(icon) ? icon :
                            <div className="icon-item">
                                <Icon srcPath={icon.srcPath} />
                            </div>)
                }
            </div>

        </div>
    </nav>
}