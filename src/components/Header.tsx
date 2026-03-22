"use client";

import { LogOut } from "lucide-react";

export default function Header() {
  return (
    <div className="flex justify-between items-center p-4 bg-gray-900 shadow">
      <h1 className="text-white font-semibold text-lg">
        Task Tracker
      </h1>

      <button
        className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition"
        onClick={() => {
          localStorage.removeItem("token");
          window.location.href = "/";
        }}
      >
        <LogOut className="w-4 h-4" />
        Logout
      </button>
    </div>
  );
}