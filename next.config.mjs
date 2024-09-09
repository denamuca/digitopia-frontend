// next.config.mjs

/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/signin", // Local API path
        destination: "https://dev.digitopia.co/api/a2/signIn", // External API endpoint
      },
      {
        source: "/api/industries", // Local API route
        destination:
          "http://ec2-3-123-161-240.eu-central-1.compute.amazonaws.com:8080/industries", // Remote API endpoint
      },
      {
        source: "/api/countries",
        destination:
          "http://ec2-3-123-161-240.eu-central-1.compute.amazonaws.com:8080/countries",
      },
      {
        source: "/api/organization/:organizationId",
        destination:
          "http://ec2-3-123-161-240.eu-central-1.compute.amazonaws.com:8181/organization/:organizationId/detail",
      },
    ];
  },
};

export default nextConfig;
