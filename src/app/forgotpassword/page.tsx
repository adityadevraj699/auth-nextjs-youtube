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
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-4">
          {step === 1 ? "Forgot Password?" : "Reset Your Password"}
        </h2>

        {message && <p className="text-green-600 text-center mb-4">{message}</p>}

        {step === 1 ? (
          <div>
            <label className="block mb-2 text-gray-600">Enter your email:</label>
            <input
              type="email"
              className="w-full p-2 border rounded"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              onClick={handleRequestReset}
              className="mt-4 w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
              Send Reset Link
            </button>
          </div>
        ) : (
          <div>
            <label className="block mb-2 text-gray-600">Enter Token:</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              placeholder="Enter token from email"
              value={token}
              onChange={(e) => setToken(e.target.value)}
            />

            <label className="block mt-4 mb-2 text-gray-600">New Password:</label>
            <input
              type="password"
              className="w-full p-2 border rounded"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />

            <button
              onClick={handleResetPassword}
              className="mt-4 w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
            >
              Reset Password
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
