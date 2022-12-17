import React, { useEffect, useState } from "react";
// import "./input.scss";

interface NavBarProps {
    onPreload: () => Promise<unknown>;
}   

export const Preload: React.FC<React.PropsWithChildren<NavBarProps>> = ({ children, onPreload}) => {

    const [isResolved, setIsResolved] = useState(false);

    useEffect(() => {
        onPreload().then(() => setIsResolved(true));
    }, [])

    return (<div className="Preload">
        { isResolved ?  children : 'loading' }
    </div>);
}