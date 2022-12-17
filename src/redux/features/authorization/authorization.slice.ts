import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthorizationState, JwtTokenData, ProtectedResources, ResourcesResponseData } from '../../../types/jwt-data';
import { fetchProtectedResources, loginThunk, loginUsingExistingToken, logoutThunk } from './authorization.thunks';
import jwt from 'jsonwebtoken';


export const initialState: AuthorizationState = {
  userJWTRoles: null,
  userGuid: null,
  userName: null,
  protectedResources: null,
  isError: false,
};

const authorizationSlice = createSlice({
  name: 'authorization',
  initialState,
  reducers: {
    setUserJWTRoles(state, action: PayloadAction<JwtTokenData['user']>) {
      state.userJWTRoles = action.payload.roles;
      state.userName = action.payload.name || '';
      state.userGuid = action.payload.guid || '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProtectedResources.fulfilled, (state, action) => {
        const resourcesData: ResourcesResponseData = action.payload;
        try {
          const mapped: Partial<ProtectedResources>[] = resourcesData?.resources.map((item) => ({
            [item.resource]: {
              active: { roles: item.method.ACTIVE?.roles || [] },
              disabled: { roles: item.method.DISABLED?.roles || [] },
            }
          }));
          state.protectedResources = mapped ? Object.assign({}, ...mapped) : null;
          state.isError = false;
        } catch (e) {
          console.error(e);
        }
      })
      .addCase(loginThunk.fulfilled, (state, action: PayloadAction<{ token?: string }>) => {
        console.log("loginThunk.fulfilled")
        if(action.payload.token) {
          const decodedTokenData = jwt.decode(action.payload.token) as JwtTokenData;        
          state.userJWTRoles = decodedTokenData.user.roles;
          state.userName = decodedTokenData.user.name || '';
          state.userGuid = decodedTokenData.user.guid || '';
        }
      })
      .addCase(logoutThunk.fulfilled, (state, action: PayloadAction<void>) => {
        state.userJWTRoles = null;
        state.userName = undefined;
        state.userGuid = undefined;
        // clearStorage
      })
      .addCase(loginUsingExistingToken.fulfilled, (state, action) => {
        state.userJWTRoles = action.payload?.user.roles || null;
        state.userName = action.payload?.user.name;
        state.userGuid = action.payload?.user.guid;
      });
  },
});

export const { setUserJWTRoles } = authorizationSlice.actions;
export const authorizationReducer = authorizationSlice.reducer;
