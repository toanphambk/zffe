import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Machine } from '../services/api';

interface SettingPageState {
  selectedMachine: Machine | undefined;
}

const initialState: SettingPageState = {
  selectedMachine: undefined,
};

const settingPageSlice = createSlice({
  name: 'settingPage',
  initialState,
  reducers: {
    removeModal: () => initialState,
    setSelectedMachine: (state, action: PayloadAction<Machine>) => {
      const { id } = action.payload
      // if (state.selectedMachine?.id === id) {
      //   state.selectedMachine = initialState.selectedMachine;
      // }
      state.selectedMachine = action.payload;
    },
  }
});

export const {
  setSelectedMachine
} = settingPageSlice.actions;

export default settingPageSlice.reducer;
