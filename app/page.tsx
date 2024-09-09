// pages/home.tsx
"use client"; // Import this line to enable SSR for this page

import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";

export default function HomePage() {
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const router = useRouter();

  useEffect(() => {
    if (!userInfo) {
      router.push("/login");
    }
  }, [userInfo, router]);

  if (!userInfo) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-blue-500">
        Hello {userInfo.name}!
      </h1>
      <Link href="/chart">
        <button className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300">
          Go to Chart Screen
        </button>
      </Link>
    </div>
  );
}
