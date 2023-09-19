"use client";
import React from "react";
import Image from "next/image";
export default function Profile({
  email,
  name,
  image,
}: {
  email?: string | null;
  name?: string | null;
  image?: string | null;
}) {
  return (
    <div className="py-4 border-b">
      <div className="flex items-center ">
        <div className="flex-1">
          <h1 className="font-bold  text-xl">{name}</h1>
          <p className="font-light">{email}</p>
        </div>
        <div className="">
          {image && (
            <Image
              src={image}
              width={80}
              height={80}
              alt=""
              className="rounded-full object-cover"
            />
          )}
        </div>
      </div>
    </div>
  );
}
