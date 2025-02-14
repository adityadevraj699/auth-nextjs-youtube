"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = async () => {
    try {
      await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setError(true);
      console.log(error.response?.data);
    }
  };

  useEffect(() => {
    const urlToken = new URLSearchParams(window.location.search).get("token");
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black">
      <div className="w-full max-w-md p-8 bg-gray-900 rounded-xl shadow-lg border border-violet-600 text-white">
        <h1 className="text-3xl font-semibold text-center text-violet-500">Verify Email</h1>

        {token ? (
          <p className="text-center text-gray-400 mt-2">Token: <span className="text-green-400 break-words">{token}</span></p>
        ) : (
          <p className="text-center text-red-500 mt-2">No token found</p>
        )}

        {verified && (
          <div className="mt-4 text-center">
            <h2 className="text-2xl text-green-400">Email Verified Successfully ✅</h2>
            <Link href="/login">
              <button className="mt-4 px-6 py-2 bg-violet-600 text-white font-semibold rounded-lg hover:bg-violet-700 transition">
                Go to Login
              </button>
            </Link>
          </div>
        )}

        {error && (
          <div className="mt-4 text-center">
            <h2 className="text-2xl bg-red-500 text-white p-2 rounded">Verification Failed ❌</h2>
          </div>
        )}
      </div>
    </div>
  );
}
