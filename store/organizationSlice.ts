// store/organizationSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface Organization {
  OrganizationName: string;
  OrganizationIndustryName: string;
  OrganizationCountryName: string;
}
interface OrganizationState {
  organization: Organization | null; // Define the type of organization
  loading: boolean;
  error: string | null;
}

const initialState: OrganizationState = {
  organization: null, // Initial state
  loading: false,
  error: null,
};

// Thunk to fetch organization details
export const fetchOrganizationDetails = createAsyncThunk(
  "organization/fetchOrganizationDetails",
  async (organizationId: string) => {
    const response = await axios.get(
      `http://ec2-3-123-161-240.eu-central-1.compute.amazonaws.com:8181/organization/${organizationId}/detail`
    );
    return response.data as Organization; // Ensure the response is typed as Organization
  }
);

const organizationSlice = createSlice({
  name: "organization",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrganizationDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrganizationDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.organization = action.payload; // Organization is typed correctly here
      })
      .addCase(fetchOrganizationDetails.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || "Failed to load organization details";
      });
  },
});

export default organizationSlice.reducer;
