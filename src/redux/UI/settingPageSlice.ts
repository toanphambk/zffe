import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductionLine } from '../services/api';

interface SettingPageState {
  selectedProductionLine: ProductionLine | undefined;
}

const initialState: SettingPageState = {
  selectedProductionLine: undefined,
};

const settingPageSlice = createSlice({
  name: 'settingPage',
  initialState,
  reducers: {
    removeModal: () => initialState,
    setSelectedProductionLine: (state, action: PayloadAction<ProductionLine>) => {
      const { id } = action.payload
      // if (state.selectedProductionLine?.id === id) {
      //   state.selectedProductionLine = initialState.selectedProductionLine;
      // }
      state.selectedProductionLine = action.payload;
    },
  }
});

export const {
  setSelectedProductionLine
} = settingPageSlice.actions;

export default settingPageSlice.reducer;
