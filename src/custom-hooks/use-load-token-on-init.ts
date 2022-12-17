import React, { useEffect } from 'react';
import { useAppSelector } from '../redux/root-reducer';
import { useLocation, useNavigate,  } from "react-router-dom";
import { getJwt } from '../services/adapters/local-storage-adapter/local-storage.adapter';

/**
 * 
 */
export function useLoadTokenOnInit() {
    // const navigate = useNavigate();
    // const userGuid = useAppSelector(state => state.authorizationState.userGuid);
    // const userLoggedIn = !!userGuid;
    
    
    // useEffect(() => {
    //     const jwt = getJwt();
    //     if(jwt) {

    //     }
    //     if (userLoggedIn) {
    //         navigate('/', { state: { from: location } });
    //     }
    // }, [userGuid]);
}
