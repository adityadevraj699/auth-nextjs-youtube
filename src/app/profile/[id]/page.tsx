"use client";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter, useParams } from "next/navigation";

export default function UserProfile() {
  const router = useRouter();
  const { id } = useParams(); // ✅ Use useParams() to get dynamic route params

  const logout = async () => {
    try {
      const response = await axios.get("/api/users/logout");
      console.log(response.data);
      toast.success("Logout successful");
      router.push("/login");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.response?.data?.error || "Logout failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Profile</h1>
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center text-white text-xl font-bold mb-4">
            A
          </div>
          <p className="text-lg text-gray-700">{id}</p> {/* ✅ Now it works */}
          <p className="text-lg text-gray-700">Aditya Kumar</p>
          <p className="text-gray-500">aditya.kumar1.cs.2022@mitmeerut.ac.in</p>
        </div>
      </div>
      <button 
        onClick={logout}
        className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
      >
        Logout
      </button>
    </div>
  );
}
