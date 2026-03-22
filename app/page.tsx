"use client";

import {  LOGIN, REGISTER } from "@/src/lib/graphql";
import { useMutation } from "@apollo/client/react";
import { useState } from "react";

export default function Home() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({
    email: "",
    password: "",
    name: "",
  });

  const [login] = useMutation<{ login: { token: string } }>(LOGIN);
  const [register] = useMutation<{ register: { token: string } }>(REGISTER);

  const handleSubmit = async () => {
    try {
      const dfn = isLogin ? login : register;
      const input = isLogin
        ? {
          email: form.email,
          password: form.password,
        }
        : form;

      const { data } = await dfn({
        variables: { input },
      });
      if (!data) return;
      const token = isLogin ? (data as { login: { token: string } }).login.token : (data as { register: { token: string } }).register.token;
      localStorage.setItem("token", token);
      !isLogin ? window.location.reload() : window.location.href = "/tasks";
    } catch (error) {
      console.error(error);
    }
  }


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-800">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-gray-700">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">{isLogin ? "Login" : "Register"}</h1>
        {!isLogin && (
          <input
            type="text"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        )}
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="w-full p-3 mb-6 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSubmit}
          className="w-full bg-teal-800 text-white p-3 rounded-md hover:bg-teal-600 transition duration-200 mb-4">
          {isLogin ? "Login" : "Register"}
        </button>
        <button
          onClick={() => setIsLogin(!isLogin)}
          className="w-full text-teal-500 hover:text-teal-700 transition duration-200">
          Switch to {isLogin ? "Register" : "Login"}
        </button>
      </div>
    </div>
  );
}
