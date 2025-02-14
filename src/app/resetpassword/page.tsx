"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token"); // Get token from URL

  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!token) {
      setMessage("Invalid or missing token.");
    }
  }, [token]);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    if (!token) {
      setMessage("Invalid token.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/users/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("Password reset successfully! Redirecting...");
        setTimeout(() => router.push("/login"), 3000);
      } else {
        setMessage(data.error || "Failed to reset password.");
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setMessage("Something went wrong.");
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black">
      <div className="w-full max-w-md p-8 bg-gray-900 rounded-xl shadow-lg border border-violet-600">
        <h2 className="text-2xl font-semibold text-center text-violet-500">Reset Password</h2>
        <p className="text-gray-400 text-center mb-4">Enter a new password below.</p>

        {message && <p className="text-center text-green-400">{message}</p>}

        <form onSubmit={handleResetPassword} className="space-y-4">
          <input
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
          />

          <button
            type="submit"
            className="w-full py-2 bg-violet-600 text-white font-semibold rounded-lg hover:bg-violet-700 transition"
            disabled={loading}
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
}
