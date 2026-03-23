"use client";

import { LOGIN, REGISTER } from "@/src/lib/graphql";
import { useMutation } from "@apollo/client/react";
import { useState } from "react";

type FormErrors = {
  email?: string;
  password?: string;
  name?: string;
  submit?: string;
};

export default function Home() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const [login] = useMutation<{ login: { token: string } }>(LOGIN);
  const [register] = useMutation<{ register: { token: string } }>(REGISTER);

  const validate = (): FormErrors => {
    const errs: FormErrors = {};
    if (!isLogin && !form.name.trim()) errs.name = "Name is required.";
    if (!form.email.trim()) {
      errs.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = "Enter a valid email address.";
    }
    if (!form.password) {
      errs.password = "Password is required.";
    } else if (form.password.length < 8) {
      errs.password = "Password must be at least 8 characters.";
    }
    return errs;
  };

  const handleSubmit = async () => {
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    try {
      const dfn = isLogin ? login : register;
      const input = isLogin
        ? { email: form.email, password: form.password }
        : form;

      const { data } = await dfn({ variables: { input } });
      if (!data) return;
      const token = isLogin
        ? (data as { login: { token: string } }).login.token
        : (data as { register: { token: string } }).register.token;
      localStorage.setItem("token", token);
      window.location.href = "/tasks";
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Something went wrong.";
      setErrors({ submit: message });
    }
  };

  const inputClass = (hasError: boolean) =>
    `w-full p-3 border rounded-md focus:outline-none focus:ring-2 ${
      hasError
        ? "border-red-400 focus:ring-red-400"
        : "border-gray-300 focus:ring-blue-500"
    }`;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-800">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-gray-700">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          {isLogin ? "Login" : "Register"}
        </h1>

        {!isLogin && (
          <div className="mb-4">
            <input
              type="text"
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className={inputClass(!!errors.name)}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>
        )}

        <div className="mb-4">
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className={inputClass(!!errors.email)}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        <div className="mb-6">
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className={inputClass(!!errors.password)}
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
        </div>

        {errors.submit && (
          <p className="text-red-500 text-sm mb-4 text-center">{errors.submit}</p>
        )}

        <button
          onClick={handleSubmit}
          className="w-full bg-teal-800 text-white p-3 rounded-md hover:bg-teal-600 transition duration-200 mb-4"
        >
          {isLogin ? "Login" : "Register"}
        </button>
        <button
          onClick={() => { setIsLogin(!isLogin); setErrors({}); }}
          className="w-full text-teal-500 hover:text-teal-700 transition duration-200"
        >
          Switch to {isLogin ? "Register" : "Login"}
        </button>
      </div>
    </div>
  );
}
