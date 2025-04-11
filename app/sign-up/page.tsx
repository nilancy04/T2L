import Link from "next/link";
import { AuthForm } from "@/components/auth/auth-form";
import Image from "next/image";
import Backimg from "@/public/bg1.jpg";

export default function SignUp() {
  return (
    <div className="container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-4 lg:px-0">
      <Link href="/sign-in" className="absolute right-4 top-4 md:right-8 md:top-8 text-white hover:text-gray-200">
        Sign in
      </Link>
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex lg:col-span-3 dark:border-r">
        <div className="absolute inset-0">
          <Image 
            src={Backimg} 
            alt="Background" 
            layout="fill" 
            objectFit="cover" 
            className="opacity-80"
          />
          <div className="w-full h-full flex items-center justify-center bg-gray-800/20">
            <div className="text-center space-y-4">
              {/* Additional Content Here */}
            </div>
          </div>
        </div>
        <div className="relative z-20 flex items-center text-lg font-medium">
          <Link href="/">Turn2Law</Link>
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
         
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8 lg:w-[350px] lg:col-span-1">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[300px]">
          <div className="flex flex-col space-y-2 text-center text-white">
            <h1 className="text-2xl font-semibold tracking-tight">Create an account</h1>
            <p className="text-sm text-gray-400">Enter your details to get started</p>
          </div>
          <AuthForm type="signup" />
          <p className="px-8 text-center text-sm text-gray-400">
            By creating an account, you agree to our{" "}
            <Link href="/terms" className="underline underline-offset-4 hover:text-white">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="underline underline-offset-4 hover:text-white">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}