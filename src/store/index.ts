import { combineReducers, configureStore, Action} from "@reduxjs/toolkit";
import { ThunkAction } from "redux-thunk";

import userReducer from "@/modules/reducers/userReducer";
import myProfileReducer from "@/modules/reducers/profileReducer";


const rootReducer = combineReducers({
  user: userReducer,
  myProfile: myProfileReducer,
});

const store = configureStore({
    reducer: rootReducer,
  }
  );


export type RootState = ReturnType<typeof rootReducer>;
export type Dispatch = typeof store.dispatch;
export type Thunk = ThunkAction<void, RootState, null, Action<string>>;

export default store;
