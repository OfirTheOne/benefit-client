import { combineReducers } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { RootState } from './root-state';
import { mainLayoutReducer } from './features/main-layout/main-layout.slice';
import { authorizationReducer } from './features/authorization/authorization.slice';
import { couponsReducer } from './features/coupons/coupons.slice';


export const RootReducer = combineReducers<RootState>({
  authorizationState: authorizationReducer,
  mainLayoutState: mainLayoutReducer,
  couponsState: couponsReducer
});

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
