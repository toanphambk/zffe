import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PortsSetting } from './portsSettingSlice';

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
        setOpenState: (state, action: PayloadAction<{ device: keyof PortsSetting; isOpen: boolean }>) => {
            const { device, isOpen } = action.payload;
            state[device].isOpen = isOpen;
        },
        setData: (state, action: PayloadAction<{ device: keyof PortsSetting; data: string }>) => {
            const { device, data } = action.payload;
            console.log(data);

            state[device].data = data;
        },
        setError: (state, action: PayloadAction<{ device: keyof PortsSetting; error: string | null }>) => {
            const { device, error } = action.payload;
            state[device].error = error;
        },
    },
});

export const { setOpenState, setData, setError } = serialPortStateSlice.actions;

export default serialPortStateSlice.reducer;
