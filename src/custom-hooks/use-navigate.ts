import React, { useEffect } from 'react';
import { useAppSelector } from '../redux/root-reducer';
import { useLocation, useNavigate,  } from "react-router-dom";


const ROUTES_ALLOWED_NOT_AUTH_ONLY = [
    'login',
    'signup'
];

/**
 * 
 */
export function useNavigateRootIfAuthorized() {
    let location = useLocation();
    const navigate = useNavigate();
    const userGuid = useAppSelector(state => state.authorizationState.userGuid);
    const userLoggedIn = !!userGuid;

    useEffect(() => {
        if (userLoggedIn) {
            navigate('/', { state: { from: location } });
        }
    }, [userGuid]);
}


/**
 * 
 */
export function useNavigateToLoginIfUserNotAuthorized() {
    let location = useLocation();
    const navigate = useNavigate();
    const userGuid = useAppSelector(state => state.authorizationState.userGuid);
    
    useEffect(() => {
        const userLoggedIn = !!userGuid;
        const isOnNotAuthRoute = ROUTES_ALLOWED_NOT_AUTH_ONLY.some(r => location?.pathname?.endsWith(r));
        if (!isOnNotAuthRoute && !userLoggedIn) {
            navigate('/login', { state: { from: location } });
        }
    }, [userGuid, location]);
}


// export function useNavigateIfNotAuth() {
//     const userGuid = useAppSelector(state => state.authorizationState.userGuid);
//     const navigate = useNavigate();
//     useEffect(() => {
//         if (!userGuid) {
//             navigate('/');
//         }
//     }, [userGuid]);

//     return { isAuth: !!userGuid, userGuid };
// }