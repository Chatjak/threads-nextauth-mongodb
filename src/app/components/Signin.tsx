"use client";
import { signIn } from "next-auth/react";
import React from "react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
export default function Signin() {
  return (
    <div className=" w-full flex flex-col items-center p-4">
      <p className="font-bold mb-8">Login in to threads</p>

      <div className="btn-signIn" onClick={() => signIn("google")}>
        <FcGoogle className="mr-4" /> Sign in with google
      </div>
      <div className="btn-signIn" onClick={() => signIn("github")}>
        <FaGithub className="mr-4" />
        Sign in with github
      </div>
    </div>
  );
}
