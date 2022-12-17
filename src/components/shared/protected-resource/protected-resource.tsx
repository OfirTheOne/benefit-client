import React, { useState } from 'react';
import { useAppSelector } from '../../../redux/root-reducer';

export const ProtectedResource: React.FC<React.PropsWithChildren> = ({ children = <></> }) => {
    const userGuid = useAppSelector(state => state.authorizationState.userGuid);
    return userGuid ? (children as React.ReactElement) : null;
}