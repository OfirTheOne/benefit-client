
import * as React from 'react';
import { Paper } from '@mui/material';
import { useAppSelector } from '../../../../../../redux/root-reducer';
import { LogoutButton } from '../../../../../shared/logout-button/logout-button';


export const UserMenuPopup: React.FC = () => {
    const userName = useAppSelector(root => root.authorizationState.userName);
    const userId = useAppSelector(root => root.authorizationState.userGuid);
    return (
        <Paper sx={{ width: '100%', backgroundColor: '#f3f3f3' }}>
            <div style={{ 
                padding: '20px',
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'space-between', 
                height: '100%' 
            }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div> userName : {userName} </div>
                    <div> userId : {userId} </div>
                </div>
                <div style={{ display: 'flex' }}> <LogoutButton /> </div>
            </div>
        </Paper>

    );
}

