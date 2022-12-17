

import React from 'react';
import { logoutThunk } from '../../../redux/features/authorization/authorization.thunks';
import { useAppDispatch } from '../../../redux/store';
import { Button } from '../../infra/button/button';


export const LogoutButton : React.FC = () => {
    const dispatch = useAppDispatch();
    return <Button 
        className='LogoutButton' 
        label='Logout' 
        onClick={() => {
            dispatch(logoutThunk());
        }}
    /> 
}