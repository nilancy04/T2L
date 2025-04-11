import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";

const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing email or password");
        }

        try {
          // Connect to MongoDB
          await connectDB();

          // Find user by email
          const user = await User.findOne({ email: credentials.email });
          if (!user) {
            throw new Error("User not found");
          }

          // Compare password
          const isValidPassword = await bcrypt.compare(credentials.password, user.password);
          if (!isValidPassword) {
            throw new Error("Invalid credentials");
          }

          // Update last login time and sign-in history
          const headers = await (credentials as any).req?.headers;
          await User.findByIdAndUpdate(user._id, {
            lastLoginAt: new Date(),
            $push: {
              signInHistory: {
                timestamp: new Date(),
                ipAddress: headers?.get('x-forwarded-for') || 'unknown',
                userAgent: headers?.get('user-agent') || 'unknown'
              }
            }
          });

          return {
            id: user._id.toString(),
            name: user.name,
            email: user.email
          };
        } catch (error) {
          console.error("Authentication error:", error);
          throw error;
        }
      },
    }),
  ],
  pages: {
    signIn: "/signin",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.name = token.name;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
