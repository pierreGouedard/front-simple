import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/store";

export interface myProfileState {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  score: object;
  status: string;
}

const initialState: myProfileState = {
    id: -1,
    email: 'na',
    first_name: '',
    last_name: '',
    phone: '',
    score: null,
    status: ''
  };

// Slice
const myProfileSlice = createSlice({
  name: "myProfile",
  initialState,
  reducers: {
    setProfile: (_, action: PayloadAction<myProfileState>) => {
      const { payload } = action;
      return payload;
    },
  },
});

// Reducers
export default myProfileSlice.reducer;

// Selectors
export const myProfileSelector = (state: RootState) => state?.myProfile;

// Actions
export const { setProfile } = myProfileSlice.actions;
