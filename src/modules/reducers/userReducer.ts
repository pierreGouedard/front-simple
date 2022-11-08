import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/store";
import { GUEST } from "@/constants/user";

export interface UserState {
  isAuthenticated?: boolean;
  roles?: string | Array<string>;
  rolesData?: { id: number; label?: string; name?: string }[];
  userData?: {};
}

export interface rolesData {
  id: number;
  label: string;
}

const initialState: UserState = {
  isAuthenticated: false,
  roles: [GUEST],
  rolesData: [],
  userData: {},
};

// Slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setIsAuthenticated: (state, action: PayloadAction<UserState>) => {
      const { payload } = action;
      state.isAuthenticated = payload.isAuthenticated;
    },
    setRoles: (state, action: PayloadAction<UserState>) => {
      const { payload } = action;
      state.roles = payload.roles;
    },
    setRolesData: (state, action: PayloadAction<UserState>) => {
      const { payload } = action;
      state.rolesData = payload.rolesData;
    },
    setUserData: (state, action: PayloadAction<UserState>) => {
      const { payload } = action;
      state.userData = payload.userData;
    },
    resetRoles: (state) => {
      state.roles = initialState?.roles;
    },
    resetUserData: (state) => {
      state.rolesData = initialState?.rolesData;
    },
    clear: (state) => {
      state = initialState;
    },
  },
});

// Reducers
export default userSlice.reducer;

// Selectors
export const userSelector = (state: RootState) => state?.user;

// Actions
export const {
  setRoles,
  setRolesData,
  setUserData,
  resetUserData,
  resetRoles,
  setIsAuthenticated,
  clear,
} = userSlice.actions;
