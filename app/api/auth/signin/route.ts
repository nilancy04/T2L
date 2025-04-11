import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

// This is a temporary solution. In production, you should use a proper database
const users = [
  {
    id: "1",
    name: "Test User",
    email: "test@example.com",
    // This is a hashed version of "password123"
    password: "$2a$10$zG2jU0Jq7U0Jq7U0Jq7U0Oq7U0Jq7U0Jq7U0Jq7U0Jq7U0Jq7U0"
  }
];

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }

    // Find user by email
    const user = users.find(user => user.email === email);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Compare password with hashed password
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    return NextResponse.json({ message: "Sign-in successful", user }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
