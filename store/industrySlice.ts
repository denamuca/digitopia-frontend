// store/industrySlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Thunk to fetch industries
export const fetchIndustries = createAsyncThunk(
  "industries/fetchIndustries",
  async () => {
    const response = await axios.get("/api/industries"); // Use local proxy
    return response.data;
  }
);

const industrySlice = createSlice({
  name: "industries",
  initialState: {
    industries: [],
    loading: false,
    error: null as string | null, // Allow error to be string or null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIndustries.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchIndustries.fulfilled, (state, action) => {
        state.loading = false;
        state.industries = action.payload;
      })
      .addCase(fetchIndustries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "An unknown error occurred";
      });
  },
});

export default industrySlice.reducer;
