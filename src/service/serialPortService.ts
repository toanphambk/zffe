import { PortsSetting } from "@/redux/data/portsSettingSlice";
import { setOpenState, setData, setError } from "../redux/data/serialPortStateSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { Store } from "redux";

export class SerialPortService {
    private port: SerialPort | null = null;
    private reader: ReadableStreamDefaultReader | null = null;
    private writer: WritableStreamDefaultWriter | null = null;
    private device: keyof PortsSetting;
    private dispatch: AppDispatch;
    private getState: () => RootState;

    constructor(device: keyof PortsSetting, store: Store<RootState>, dispatch: AppDispatch) {
        this.dispatch = dispatch;
        this.getState = () => store.getState()
        this.device = device;
        navigator.serial.addEventListener('connect', this.handleConnect);
        navigator.serial.addEventListener('disconnect', this.handleDisconnect);
    }

    async openPort() {
        if (this.port) {
            console.log('An open operation is already in progress.');
            return;
        }

        const { portInfo, portOption } = this.getPortSettings();

        if ('serial' in navigator && portInfo && portOption) {
            try {
                const ports = await navigator.serial.getPorts();
                const port = ports.find(p => p.getInfo().usbVendorId === portInfo.usbVendorId && p.getInfo().usbProductId === portInfo.usbProductId);

                if (!port) {
                    throw new Error("No matching port found");
                }

                await port.open(portOption);
                this.port = port;
                this.dispatch(setOpenState({ device: this.device, isOpen: true }));
                this.reader = port.readable?.getReader();
                this.writer = port.writable?.getWriter();
                this.readData();
            } catch (error) {
                console.error(`Error opening serial port for device ${this.device}:`, error);
                this.dispatch(setError({ device: this.device, error: error instanceof Error ? error.message : String(error) }));
            }
        } else {
            console.error("Web Serial API not supported or port settings are missing.");
        }
    }


    getPortSettings() {
        const state = this.getState();
        const settings = state.portsSettingReducer[this.device];

        if (!settings) {
            throw (`No settings found for device: ${this.device}`)
        }

        return {
            portInfo: settings.portInfo,
            portOption: settings.portOption,
        };
    }

    async readData() {
        if (!this.reader) {
            console.error("No reader available for reading data.");
            return;
        }

        let accumulatedData = "";
        let lastDispatchedData = "";

        try {
            while (true) {
                const { value, done } = await this.reader.read();
                if (done) {
                    console.log("Stream closed or reader released.");
                    this.reader.releaseLock();
                    break;
                }

                accumulatedData += new TextDecoder().decode(value);

                if (accumulatedData.endsWith('\r')) {
                    let dataToDispatch = accumulatedData.slice(0, -1);
                    accumulatedData = "";


                    if (dataToDispatch !== lastDispatchedData) {
                        this.dispatch(setData({ device: this.device, data: dataToDispatch }));
                        lastDispatchedData = dataToDispatch;
                    }
                }
            }
        } catch (error) {
            console.error(`Error reading from serial port for device ${this.device}:`, error);
            this.dispatch(setError({ device: this.device, error: error instanceof Error ? error.message : String(error) }));
        }
    }

    async writeData(data: ArrayBuffer) {
        if (!this.writer) {
            console.error("No writer available for sending data.");
            return;
        }

        try {
            await this.writer.write(data);
        } catch (error) {
            console.error("Error writing data to serial port:", error);
        }
    }

    async closePort() {
        if (this.reader) {
            await this.reader.cancel();
            this.reader.releaseLock();
            this.reader = null;
        }
        if (this.writer) {
            await this.writer.close();
            this.writer.releaseLock();
            this.writer = null;
        }
        if (this.port) {
            await this.port.close();
            this.port = null;
            this.dispatch(setOpenState({ device: this.device, isOpen: false }));
        }
    }


    handleConnect = async (event: Event) => {
        console.log('Serial port connected:', event.target);

        const port = event.target as SerialPort;
        const { portInfo } = this.getPortSettings()
        
        if (port.getInfo().usbVendorId === portInfo?.usbVendorId && port.getInfo().usbProductId === portInfo?.usbProductId) {
            if (!this.port || this.port !== port) {
                try {
                    await this.openPort();
                } catch (error) {
                    console.error('Error opening serial port:', error);
                    this.dispatch(setError({ device: this.device, error: error instanceof Error ? error.message : String(error) }));
                }
            }
        }
    };
    

    handleDisconnect = async (event: Event) => {
        console.log('Serial port disconnected:', event.target);
        const port = event.target as SerialPort;
        if (this.port && port === this.port) {
            this.port = null;
            this.writer = null;
            this.reader = null;
            this.dispatch(setOpenState({ device: this.device, isOpen: false }));
        }
    };
}