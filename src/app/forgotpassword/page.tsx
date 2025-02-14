"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState(1); // Step 1: Enter Email, Step 2: Enter New Password
  const [message, setMessage] = useState("");
  const router = useRouter();

  // Step 1: Request Reset Link
  const handleRequestReset = async () => {
    const response = await fetch("/api/users/forgotpassword", {
      method: "POST",
      body: JSON.stringify({ email }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();
    if (response.ok) {
      setMessage("Reset link sent to your email.");
      setStep(2);
    } else {
      setMessage(data.error);
    }
  };

  // Step 2: Reset Password
  const handleResetPassword = async () => {
    const response = await fetch("/api/users/forgotpassword", {
      method: "PUT",
      body: JSON.stringify({ token, newPassword }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();
    if (response.ok) {
      setMessage("Password reset successful! Redirecting to login...");
      setTimeout(() => router.push("/login"), 2000);
    } else {
      setMessage(data.error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="bg-gray-900 p-8 rounded-xl shadow-lg w-full max-w-md border border-violet-600">
        <h2 className="text-2xl font-semibold text-center text-violet-500 mb-6">
          {step === 1 ? "Forgot Password?" : "Reset Your Password"}
        </h2>

        {message && <p className="text-green-400 text-center mb-4">{message}</p>}

        {step === 1 ? (
          <div>
            <label className="block mb-2 text-gray-400">Enter your email:</label>
            <input
              type="email"
              className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              onClick={handleRequestReset}
              className="mt-4 w-full bg-violet-600 text-white font-semibold py-2 rounded-lg hover:bg-violet-700 transition"
            >
              Send Reset Link
            </button>
          </div>
        ) : (
          <div>
            <label className="block mb-2 text-gray-400">Enter Token:</label>
            <input
              type="text"
              className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
              placeholder="Enter token from email"
              value={token}
              onChange={(e) => setToken(e.target.value)}
            />

            <label className="block mt-4 mb-2 text-gray-400">New Password:</label>
            <input
              type="password"
              className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />

            <button
              onClick={handleResetPassword}
              className="mt-4 w-full bg-green-600 text-white font-semibold py-2 rounded-lg hover:bg-green-700 transition"
            >
              Reset Password
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
