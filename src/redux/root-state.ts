
import { MainLayoutState } from './features/main-layout/main-layout.slice';
import { AuthorizationState } from '../types/jwt-data';
import { CouponsState } from '../types/coupon/coupon-state.interface';

export interface RootState {
  mainLayoutState: MainLayoutState;
  authorizationState: AuthorizationState;
  couponsState: CouponsState;
}
