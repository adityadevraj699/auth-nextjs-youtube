"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCheckboxChange = (event: {
    target: { checked: boolean | ((prevState: boolean) => boolean) };
  }) => {
    setIsChecked(event.target.checked);
    console.log(event.target.checked ? "Checked" : "Not Checked");
  };

  const onSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log("Before API call:", user);
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("SignUp Success: ", response.data);
      toast.success(response.data.message);
      router.push("/login");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log("SignUp Failed", error.message);
      toast.error(error.response?.data?.error || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0 &&
      isChecked
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user, isChecked]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="bg-gray-900 p-8 rounded-xl shadow-lg w-96 border border-violet-600">
        <h1 className="text-2xl font-bold text-center text-violet-500 mb-6">
          {loading ? "Processing..." : "SignUp"}
        </h1>
        <form className="flex flex-col space-y-4" onSubmit={onSignup}>
          <input
            id="username"
            type="text"
            placeholder="Username"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
            required
          />
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
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="signupCheck"
              checked={isChecked}
              onChange={handleCheckboxChange}
              className="accent-violet-500"
            />
            <label htmlFor="signupCheck" className="text-gray-400 text-sm">
              I accept all terms & conditions
            </label>
          </div>
          <button
            type="submit"
            className={`w-full py-2 text-white font-semibold rounded-lg transition ${
              buttonDisabled
                ? "bg-gray-700 cursor-not-allowed"
                : "bg-violet-600 hover:bg-violet-700"
            }`}
          >
            {buttonDisabled ? "Please fill all fields" : "Signup"}
          </button>
        </form>
        <p className="text-center text-gray-400 mt-4">
          Already have an account?{" "}
          <Link href="/login" className="text-violet-400 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
