"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { HiHome } from "react-icons/hi";
import { HiBars3BottomRight } from "react-icons/hi2";
import { IoCreateOutline } from "react-icons/io5";
import { AiOutlineHeart, AiOutlineSearch, AiOutlineUser } from "react-icons/ai";
import { signOut } from "next-auth/react";
export default function Topbar() {
  return (
    <div className="stick top-0 left-0 w-full ">
      <div className="flex justify-between py-4 items-center">
        <div className="">
          <Image src={"/logo.png"} alt="logo" width={28} height={28} />
        </div>
        <ul className="hidden sm:max-w-lg  sm:flex justify-between w-full items-center cursor-pointer">
          <li className="topbar-icon">
            <Link href={"/"}>
              <HiHome />
            </Link>
          </li>
          <li className="topbar-icon">
            <Link href={"/"}>
              <AiOutlineSearch />
            </Link>
          </li>
          <li className="topbar-icon">
            <Link href={"/"}>
              <IoCreateOutline />
            </Link>
          </li>
          <li className="topbar-icon">
            <Link href={"/"}>
              <AiOutlineHeart />
            </Link>
          </li>
          <li className="topbar-icon">
            <Link href={"/profile"}>
              <AiOutlineUser />
            </Link>
          </li>
        </ul>
        <div className="topbar-icon cursor-pointer" onClick={() => signOut()}>
          <HiBars3BottomRight />
        </div>
      </div>
    </div>
  );
}
