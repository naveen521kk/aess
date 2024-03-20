import Link from "next/link";
import Image from "next/image";

import { UserLoginForm } from "@/components/user-login-form";

import logo from "@/assets/logo.svg";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to AESS.",
};

export default function Home() {
  return (
    <>
      <div className="container relative flex h-[100vh] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          <div className="absolute inset-0 bg-[#155e75]" />
          <div className="relative z-20 flex items-center text-lg font-medium">
            <Image src={logo} width={50} alt="AESS Logo" />
            AESS
          </div>
          <div className="typewriter relative z-20 flex h-full w-fit items-center justify-center text-2xl font-medium">
            <h1>Welcome to AESS. Get started :)</h1>
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">Login</h1>
              <p className="text-sm text-muted-foreground">
                Enter your email and password below to login
              </p>
            </div>
            <UserLoginForm />
          </div>
        </div>
      </div>
    </>
  );
}
