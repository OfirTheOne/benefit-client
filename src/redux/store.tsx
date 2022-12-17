/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { AnyAction, applyMiddleware, CombinedState, createStore, Store, ThunkDispatch } from '@reduxjs/toolkit';
import { createBrowserHistory } from 'history';
import { useDispatch } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import { RootReducer } from './root-reducer';
import { RootState } from './root-state';

export type AppStore = ReturnType<typeof configureStore>;
export let store: AppStore;
export const history = createBrowserHistory();

export function configureStore(): Store<RootState> {
  const composeFunction = composeWithDevTools({ name: 'C3 Console' });

  const reducers = (state: CombinedState<RootState> | undefined, action: AnyAction) => {
    if (action.type && action.type === 'RESET') {
      return action.payload;
    }
    return RootReducer(state, action);
  };

  store = createStore(reducers, {}, composeFunction(applyMiddleware(thunkMiddleware)));

  return store;
}

export function getStore(): AppStore {
  if (store) return store;
  return configureStore();
}

export const useAppDispatch = () => useDispatch<ThunkDispatch<RootState, unknown, AnyAction>>();

export type TypedUseAppDispatchHook = ReturnType<typeof useAppDispatch>;
