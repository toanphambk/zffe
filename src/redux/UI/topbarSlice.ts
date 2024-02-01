import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface topbarState {
    scanState: "inActive" | "active" | "success" | "error";
}

const initialState: topbarState = {
    scanState: "inActive",
};

const topbarSlice = createSlice({
    name: 'topbar',
    initialState,
    reducers: {
        SetScanState: (state, actions :PayloadAction<topbarState>) => {
            const {scanState}  = actions.payload
            state.scanState = scanState
        },
    },
});




export const { SetScanState } = topbarSlice.actions;
export default topbarSlice.reducer;
