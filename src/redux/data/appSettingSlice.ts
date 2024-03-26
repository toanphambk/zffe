import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Machine } from "../services/api";


export type AppSettingState = {
    machine: Machine ;
}

const initialAppSettingState: Partial<AppSettingState> = {
    machine: undefined
};

const appSettingSlice = createSlice({
    name: 'appSetting',
    initialState: initialAppSettingState,
    reducers: {
        setAppSettingMachine: (state, action: PayloadAction<Machine | undefined>) => {
            state.machine = action.payload;
        }
    },
});

export const { setAppSettingMachine } = appSettingSlice.actions;
export default appSettingSlice.reducer;