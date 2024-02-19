import { createSlice, PayloadAction } from '@reduxjs/toolkit';


export type PortInfo = {
  portInfo: Partial<SerialPortInfo>,
  portOption?: SerialOptions
};

export type PortsSetting = {
  rfid?: Partial<PortInfo>,
  scanner?: Partial<PortInfo>
}

const initialState: Partial<PortsSetting> = {
  rfid: {},
  scanner: {},
};

const portsSettingSlice = createSlice({
  name: 'portsSetting',
  initialState,
  reducers: {
    setPortInfo: (state, action: PayloadAction<{ device: keyof PortsSetting; portInfo: Partial<SerialPortInfo> }>) => {
      const { device, portInfo } = action.payload;
      state[device]!.portInfo =  portInfo ;
    },
    setPortOption: (state, action: PayloadAction<{ device: keyof PortsSetting; portOption: SerialOptions }>) => {
      const { device, portOption } = action.payload;
      state[device]!.portOption = portOption 
    },
    removeSerialSetting: () => initialState
  },
});

export const { setPortInfo, setPortOption, removeSerialSetting } = portsSettingSlice.actions;

export default portsSettingSlice.reducer;
