"use client"
import Link from "next/link";
import React, { useState } from "react";
import {useRouter} from "next/navigation";
import {axios} from "axios";

export default function SignupPage(){
    const [user, setUser] = useState({
        username: "",
        email: "",
        password: "",
    })

    const onSignup = async () => {}
    return (
        <div className="flex items-center justify-center min-h-screen bg-blue-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96">
        <h1 className="text-2xl font-bold text-center text-blue-600 mb-6">Signup</h1>
        <form className="flex flex-col space-y-4">
          <input
            id="username"
            type="text"
            placeholder="username"
            value={user.username}
            onChange={(e) => setUser({...user, username: e.target.value})}

            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            id="email"

            type="email"
            placeholder="Email address"
            value={user.email}
            onChange={(e) => setUser({...user, email: e.target.value})}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            id="password"
            type="password"
            placeholder="Password"
            value={user.password}
            onChange={(e) => setUser({...user, password: e.target.value})}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="signupCheck" className="accent-blue-500" />
            <label htmlFor="signupCheck" className="text-gray-700 text-sm">
              I accept all terms & conditions
            </label>
          </div>
          <button
          onClick={onSignup}
            type="submit"
            className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
          >
            Signup
          </button>
        </form>
        <p className="text-center text-gray-600 mt-4">
          Already have an account? <Link href="/login" className="text-blue-600 hover:underline">Login</Link>
        </p>
      </div>
    </div>
      );
}