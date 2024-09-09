// store/index.ts
import { configureStore } from "@reduxjs/toolkit";
import industryReducer from "./industrySlice";
import countryReducer from "./countrySlice";
import organizationReducer from "./organizationSlice";
import authReducer from "./authSlice";

const store = configureStore({
  reducer: {
    industries: industryReducer,
    countries: countryReducer,
    organization: organizationReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; // Export AppDispatch type

export default store;
