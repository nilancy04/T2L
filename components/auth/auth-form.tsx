"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

interface AuthFormProps {
  type: "signin" | "signup";
}

export function AuthForm({ type }: AuthFormProps) {
  const [name, setName] = useState(""); // Added name field
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (type === "signup") {
      // Call signup API
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to sign up");
        setLoading(false);
        return;
      }

      // Auto sign in after successful signup
      await signIn("credentials", { email, password, redirect: false });
      router.push("/dashboard");
    } else {
      // Sign-in logic
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        setError("Invalid email or password");
        setLoading(false);
        return;
      }

      router.push("/dashboard");
    }
  };

  return (
    <form onSubmit={handleAuth} className="flex flex-col gap-4">
      {error && <p className="text-red-500">{error}</p>}
      
      {type === "signup" && (
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded-md bg-gray-800 text-white"
        />
      )}
      
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 rounded-md bg-gray-800 text-white"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 rounded-md bg-gray-800 text-white"
      />
      
      <button
        type="submit"
        disabled={loading}
        className="bg-[#ffd800] text-white p-2 rounded-md"
      >
        {loading ? (type === "signup" ? "Signing up..." : "Signing in...") : type === "signup" ? "Sign Up" : "Sign In"}
      </button>
    </form>
  );
}
