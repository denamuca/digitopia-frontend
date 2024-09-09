// pages/login.tsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { setTokens } from "../../store/authSlice";
import { AppDispatch } from "../../store";

interface IdTokenPayload {
  organizationId: string;
  role: string;
  organizationRole: string;
  name: string;
  family_name: string;
}

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/signin", { email, password });

      const { accessToken, idToken } = response.data;
      console.log("Login response:", response.data);

      // Decode the idToken
      const decodedToken = jwtDecode<IdTokenPayload>(idToken.jwtToken);

      // Dispatch action to save tokens and user info
      dispatch(
        setTokens({
          accessToken: accessToken.jwtToken,
          idToken: idToken.jwtToken,
          userInfo: {
            name: decodedToken.name,
            organizationId: decodedToken.organizationId,
            // Add other user info fields as needed
          },
        })
      );

      // Redirect to home page
      router.push("/");
    } catch (error) {
      console.error("Login error:", error);
      alert("Invalid credentials");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Login
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
