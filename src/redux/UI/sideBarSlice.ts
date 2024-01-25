import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HiAdjustments, HiHome, HiLogout, HiUser } from "react-icons/hi";

interface SidebarState {
    activeIndex: number;
}

interface MenuItem {
    icon: React.ElementType;
    label: string;
    link: string;
}
const initialState: SidebarState = {
    activeIndex: 0,
};

const sidebarSlice = createSlice({
    name: 'sidebar',
    initialState,
    reducers: {
        SetSiebarActiveIndex: (state,actions) => {
            state.activeIndex = menuItems.findIndex(item => item.link == actions.payload);
        },
    },
});



export const menuItems: MenuItem[] = [
    { icon: HiHome, label: "Home", link: "/home" },
    { icon: HiAdjustments, label: 'Setting', link: "/home/setting" },
    { icon: HiUser, label: "Profile", link: "/home/profile" },
    { icon: HiLogout, label: "Logout", link: "/login" },
]


export const { SetSiebarActiveIndex } = sidebarSlice.actions;
export default sidebarSlice.reducer;
