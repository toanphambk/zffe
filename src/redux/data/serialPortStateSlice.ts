import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DeviceState {
    isOpen: boolean;
    data: string;
    error: string | null;
}

interface SerialPortState {
    rfid: DeviceState;
    scanner: DeviceState;
}

const initialState: SerialPortState = {
    rfid: { isOpen: false, data: '', error: null },
    scanner: { isOpen: false, data: '', error: null },
};

export const serialPortStateSlice = createSlice({
    name: 'serialPortState',
    initialState,
    reducers: {
        setOpenState: (state, action: PayloadAction<{ device: keyof SerialPortState; isOpen: boolean }>) => {
            const { device, isOpen } = action.payload;
            state[device].isOpen = isOpen;
        },
        setData: (state, action: PayloadAction<{ device: keyof SerialPortState; data: string }>) => {
            const { device, data } = action.payload;
            console.log(data);
            state[device].data = data;
        },
        setError: (state, action: PayloadAction<{ device: keyof SerialPortState; error: string | null }>) => {
            const { device, error } = action.payload;
            state[device].error = error;
        },
    },
});

export const { setOpenState, setData, setError } = serialPortStateSlice.actions;

export default serialPortStateSlice.reducer;
