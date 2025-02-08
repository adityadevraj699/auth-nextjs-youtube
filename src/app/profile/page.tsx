"use client";

export default function ProfilePage() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-blue-100">
          <div className="bg-white p-8 rounded-xl shadow-lg w-96 text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Profile</h1>
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center text-white text-xl font-bold mb-4">
                A
              </div>
              <p className="text-lg text-gray-700">Aditya Kumar</p>
              <p className="text-gray-500">aditya.kumar1.cs.2022@mitmeerut.ac.in</p>
            </div>
          </div>
        </div>
      );
}