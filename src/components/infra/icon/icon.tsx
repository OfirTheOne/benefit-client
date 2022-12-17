import React from 'react';
import './icon.scss';

export interface IconProps {
    srcPath: string
    height?: string;
    width?: string;
    name?: string
    fill? : string,
    onClick?: React.DOMAttributes<HTMLImageElement>['onClick'],
    onTouchStart?: React.DOMAttributes<HTMLImageElement>['onTouchStart'],
}
export const Icon: React.FC<IconProps> = ({ onClick, onTouchStart, srcPath, height, width }) => {
    return (
        <img
            onClick={onClick}
            onTouchStart={onTouchStart}
            className="Icon" src={srcPath} style={{ height, width }}
        />
    );
};