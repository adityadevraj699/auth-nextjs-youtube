"use client";

import Link from "next/link";
import React, { useState } from "react";
import {useRouter} from "next/navigation";
import {axios} from "axios";

export default function LoginPage(){

    const [user, setUser] = useState({
            email: "",
            password: "",
        })
    
        const onLogin = async () => {}

        return (
            <div className="flex items-center justify-center min-h-screen bg-blue-100">
              <div className="bg-white p-8 rounded-xl shadow-lg w-96">
                <h1 className="text-2xl font-bold text-center text-blue-600 mb-6">Login</h1>
                <form className="flex flex-col space-y-4" onSubmit={onLogin}>
                  <input
                    id="email"
                    type="email"
                    placeholder="Email address"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  <input
                    id="password"
                    type="password"
                    placeholder="Password"
                    value={user.password}
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  <button
                    type="submit"
                    className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
                  >
                    Login
                  </button>
                </form>
                <p className="text-center text-gray-600 mt-4">
                  Do not have an account? <Link href="/signup" className="text-blue-600 hover:underline">Signup</Link>
                </p>
              </div>
            </div>
          );
    }