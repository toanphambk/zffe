import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface ModalState {
    isActive: boolean;
    renderCount: number;
    childComponent: React.ReactNode | null;
}

const initialState: ModalState = {
    isActive: false,
    childComponent: null,
    renderCount: 0
};

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        removeModal: () => initialState,
        setModal: (state, action: PayloadAction<React.ReactNode>) => {
            if (!state.isActive) {
                state.childComponent = action.payload;
                state.isActive = true
                state.renderCount++
            }
        },
    },
});


export const { setModal, removeModal } = modalSlice.actions;

export default modalSlice.reducer;