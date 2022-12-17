import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { Theme } from '../../../models/theme/theme';
// import { ModalType } from '../../../types/enums';

export interface MainLayoutState {
  title: string;
  theme: Theme;
  screenDimentions: ScreenDimentions;
}

export interface PanelState {
  isOpen: boolean;
}


export interface ToolbarPanelsState {
  searchLocationPanel: PanelState;
}
export interface ScreenDimentions {
  screenSize: ScreenSize;
  height: number;
  width: number;
}

export enum ScreenSize {
  TooSmall = 'too-small',
  Small = 'small',
  Medium = 'medium',
  Large = 'large',
}

export const initialState: MainLayoutState = {
  title: 'C3 Console',
  theme: Theme.light,
  screenDimentions: {
    height: 0,
    width: 0,
    screenSize: ScreenSize.Large,
  },
  // systemMessageModal: { modalList: [] }
};
  

const mainLayoutSlice = createSlice({
  name: 'main-layout-slice',
  initialState,
  reducers: {
    setThemeAction: (state, action: PayloadAction<Theme>) => {
      state.theme = action.payload;
    },
    setScreenDimensions: (state, action: PayloadAction<ScreenDimentions>) => {
      state.screenDimentions = action.payload;
    },
   
  }
});

export const {
  setThemeAction,
  setScreenDimensions,
  // displayModal,
  // removeModal
} = mainLayoutSlice.actions;
export const mainLayoutReducer = mainLayoutSlice.reducer;
