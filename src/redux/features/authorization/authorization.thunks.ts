import { createAsyncThunk } from '@reduxjs/toolkit';
import { systemService } from '../../../services/api-services/system-service';
import { JwtTokenData, ResourcesResponseData } from '../../../types/jwt-data';
import { ThunksAction } from '../../thunk-action.enum';
import jwt from 'jsonwebtoken';
import { getJwt } from '../../../services/adapters/local-storage-adapter/local-storage.adapter';

export const fetchProtectedResources = createAsyncThunk(
  ThunksAction.GET_PROTECTED_RESOURCES, async (): Promise<ResourcesResponseData> => {
  const data = await systemService.getProtectedResources();
  return data as ResourcesResponseData;
});

export const loginThunk = createAsyncThunk<{ token?: string }, {user: string , pass: string }>(
  ThunksAction.LOGIN,  ({user, pass}, { }) => {
    return systemService.login(user , pass);
});

export const logoutThunk = createAsyncThunk<void>(
  ThunksAction.LOGOUT,  (_, { }): Promise<void> => {
    return systemService.logout();
});

export const loginUsingExistingToken = createAsyncThunk<JwtTokenData | undefined>(
  ThunksAction.LOGIN_EXISTING_TOKEN, async (_, { }): Promise<JwtTokenData | undefined> => {
    console.log('loginUsingExistingToken')
    const token = getJwt();
    if(token) {
      const tokenData = jwt.decode(token) as JwtTokenData;        
      return tokenData;
    }
});

