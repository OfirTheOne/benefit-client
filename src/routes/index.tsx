import React, { useCallback, useEffect, useState } from 'react';
import {
    redirect,
    Route,
    LoaderFunction,
    createRoutesFromElements,
    RouterProvider,
    createBrowserRouter,
    Navigate,
    useNavigate,
    Outlet,
} from "react-router-dom";
import { App as Root } from '../app';
import { LoginPage } from '../components/features/pages/auth-page/login';
import { SignUpPage } from '../components/features/pages/auth-page/signup';
import { ErrorPage } from '../components/features/pages/error-page/error-page';
import { HomePage } from '../components/features/pages/home-page/home-page';
import { SearchResultPage } from '../components/features/pages/home-page/search-result.page';
import { loginUsingExistingToken } from '../redux/features/authorization/authorization.thunks';
import { useAppSelector } from '../redux/root-reducer';
import { useAppDispatch } from '../redux/store';
import { JwtTokenData } from '../types/jwt-data';


function getPathname(url: string) {
    return new URL(url).pathname;
}

function useOnRootLoader() {
    const dispatch = useAppDispatch();
    const userGuid = useAppSelector(state => state.authorizationState.userGuid);
    const onRootLoader = useCallback((async ({ params, request }) => {
        console.log(request.url)
        const tokenData = await dispatch(loginUsingExistingToken()).unwrap();
        if (!tokenData) {
            return redirect("/login");
        }
        if (getPathname(request.url) === '/') {
            return redirect("/home");
        }
    }) as LoaderFunction, [userGuid]);

    return { onRootLoader };
}

function useOnChallengesLoader() {
    const userRoles = useAppSelector(state => state.authorizationState.userJWTRoles);
    const onChallengesLoader = useCallback((async ({ params, request }) => {
        if (!userRoles?.user?.includes('SUPERVISOR')) {
            return redirect("/unauthorized");
        }
    }) as LoaderFunction, [userRoles]);

    return { onChallengesLoader };
}



export const AuthenticatePreRoute: React.FC<React.PropsWithChildren<{ children: React.ReactElement }>> = ({ children }) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const userGuid = useAppSelector(state => state.authorizationState.userGuid);
    const [authSucceeded, setAuthSucceeded] = useState(false);
    console.log('AuthenticatePreRoute');
    useEffect(() => {
        if (userGuid) {
            setAuthSucceeded(true);
        } else {
            dispatch(loginUsingExistingToken())
                .unwrap()
                .then((tokenData: JwtTokenData | undefined) => tokenData ?
                    setAuthSucceeded(true) :
                    navigate('/login')
                )
                .catch(() => navigate('/login'));
        }
    }, []);
    return authSucceeded ? children : null;
};

export const ProtectedRoute: React.FC<React.PropsWithChildren<{ children: React.ReactElement }>> = ({ children }) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const userGuid = useAppSelector(state => state.authorizationState.userGuid);

    useEffect(() => {
        if (!userGuid) {
            navigate('/');
        }
    }, [userGuid]);
    return children;
};

export const AppRouter: React.FC<React.PropsWithChildren<{}>> = () => {

    const routes = createRoutesFromElements(
        <Route path="/" element={<Root />} >
            <Route path="login" element={<LoginPage />} />
            <Route path="signup" element={<SignUpPage />} />
            <Route
                path="/"
                element={
                    <AuthenticatePreRoute>
                        <Outlet />
                    </AuthenticatePreRoute>
                }
                errorElement={<ErrorPage />}
            >
                <Route path="/" element={<HomePage />} />
                <Route path="/search" element={<SearchResultPage />} /> 
            </Route>
            {/* <Route path="/unauthorized" element={() => <div><h1>Unauthorized</h1></div>} /> */}
        </Route>
    );

    const router = createBrowserRouter(routes);
    return <RouterProvider router={router} />

}
