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
      // For signup, we'll just redirect to signin since we're using in-memory auth
      setError("Signup is not available in demo mode. Please use the test account.");
      setLoading(false);
      return;
    } else {
      // Sign-in logic
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        setError("Invalid email or password. Try test@example.com / password123");
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
