"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);

      console.log("Login Success: ", response.data);
      toast.success(response.data.message);
      router.push("/profile");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log("Login Failed", error.message);
      toast.error(error.response?.data?.error || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="bg-gray-900 p-8 rounded-xl shadow-lg w-96 border border-violet-600">
        <h1 className="text-2xl font-bold text-center text-violet-500 mb-6">
          {loading ? "Processing..." : "Login"}
        </h1>
        <form className="flex flex-col space-y-4" onSubmit={onLogin}>
          <input
            id="email"
            type="email"
            placeholder="Email address"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
            required
          />
          <input
            id="password"
            type="password"
            placeholder="Password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
            required
          />
          <button
            type="submit"
            className={`w-full py-2 text-white font-semibold rounded-lg transition ${
              buttonDisabled
                ? "bg-gray-700 cursor-not-allowed"
                : "bg-violet-600 hover:bg-violet-700"
            }`}
          >
            {buttonDisabled ? "Please fill all fields" : "Login"}
          </button>
        </form>
        <div className="mt-4 text-center">
          <Link
            href="/forgotpassword"
            className="text-violet-400 hover:underline"
          >
            Forgot Password?
          </Link>
        </div>
        <p className="text-center text-gray-400 mt-4">
          Don’t have an account?{" "}
          <Link href="/signup" className="text-violet-400 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
