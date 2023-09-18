import Image from "next/image";
import React from "react";

export default function loading() {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Image src={"/logo.png"} width={100} height={100} alt="" />
    </div>
  );
}
