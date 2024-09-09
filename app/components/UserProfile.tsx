// app/components/UserProfile.tsx
"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchIndustries } from "../../store/industrySlice";
import { fetchCountries } from "../../store/countrySlice";
import { fetchOrganizationDetails } from "../../store/organizationSlice";
import { RootState, AppDispatch } from "../../store"; // Import AppDispatch

export default function UserProfile() {
  const dispatch = useDispatch<AppDispatch>(); // Typed dispatch

  const industries = useSelector(
    (state: RootState) => state.industries.industries
  );
  const countries = useSelector(
    (state: RootState) => state.countries.countries
  );
  const organization = useSelector(
    (state: RootState) => state.organization.organization
  );
  const loading = useSelector((state: RootState) => state.organization.loading);

  useEffect(() => {
    dispatch(fetchIndustries());
    dispatch(fetchCountries());
    dispatch(fetchOrganizationDetails("ORGANIZATION_ID")); // Replace ORGANIZATION_ID
  }, [dispatch]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>User Profile</h1>
      <h2>Organization Details</h2>
      {organization && (
        <div>
          <p>Organization Name: {organization.OrganizationName}</p>
          <p>Industry: {organization.OrganizationIndustryName}</p>
          <p>Country: {organization.OrganizationCountryName}</p>
        </div>
      )}

      <h2>Industries</h2>
      <ul>
        {industries.map((industry: any) => (
          <li key={industry.id}>{industry.name}</li>
        ))}
      </ul>

      <h2>Countries</h2>
      <ul>
        {countries.map((country: any) => (
          <li key={country.id}>{country.name}</li>
        ))}
      </ul>
    </div>
  );
}
