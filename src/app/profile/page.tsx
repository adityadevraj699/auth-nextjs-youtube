"use client";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import { FiLogOut } from "react-icons/fi"; // Logout Icon


export default function ProfilePage() {
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successful");
      router.push("/login");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Logout failed");
    }
  };

  const emailVerification = async () => {
    if (!user) return toast.error("User not found!");
  
    try {
      await axios.post("/api/users/send-verification-email", {
        email: user.email,
        userId: user._id,
      });
  
      toast.success("Verification email sent!");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Failed to send verification email");
    }
  };
  
  

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const res = await axios.get("/api/users/me");
        setUser(res.data.data);
        console.log("User details in profile:", res.data.data);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        toast.error("Failed to fetch user details");
      } finally {
        setLoading(false);
      }
    };
    fetchUserDetails();
  }, []);

  if (loading) return <p className="text-center mt-5 text-gray-600">Loading...</p>;
  if (!user) return <p className="text-center mt-5 text-red-500">User not found</p>;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-400 to-purple-600 p-4">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-sm text-center relative">
        {/* Avatar */}
        <div className="w-24 h-24 mx-auto bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-md">
          {user.username?.charAt(0).toUpperCase()}
        </div>

        {/* User Info */}
        <h1 className="text-2xl font-semibold text-gray-800 mt-3">{user.username}</h1>
        <p className="text-gray-500 text-sm">{user.email}</p>

        {/* User Details */}
        <div className="mt-4 space-y-3 text-left">
          <div className="flex justify-between items-center bg-gray-100 p-3 rounded-lg">
            <span className="text-gray-600">User ID</span>
            <Link href={`/profile/${user._id}`} className="text-blue-600 font-medium text-sm truncate">
              {user._id}
            </Link>
          </div>
          <div className="flex justify-between items-center bg-gray-100 p-3 rounded-lg">
            <span className="text-gray-600">Verification</span>
            <span className={`text-sm font-medium ${user.isVerified ? "text-green-600" : "text-red-500"}`}>
              {user.isVerified ? "Verified" : (
                <button onClick={emailVerification}>unverified</button>
              )}
            </span>
          </div>
          <div className="flex justify-between items-center bg-gray-100 p-3 rounded-lg">
            <span className="text-gray-600">Admin Status</span>
            <span className={`text-sm font-medium ${user.isAdmin ? "text-green-600" : "text-red-500"}`}>
              {user.isAdmin ? "Admin" : "User"}
            </span>
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={logout}
          className="mt-5 w-full py-3 bg-red-500 text-white font-semibold rounded-lg flex items-center justify-center gap-2 hover:bg-red-600 transition"
        >
          <FiLogOut className="text-lg" />
          Logout
        </button>
      </div>
    </div>
  );
}
