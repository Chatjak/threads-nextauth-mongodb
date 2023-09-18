import Image from "next/image";
import React from "react";

export default function BgSignin() {
  return (
    <div className="fixed left-1/2 top-0 -translate-x-1/2  w-[1440px] mx-auto ">
      <Image
        src={"/bg-threads.png"}
        alt=""
        width={1440}
        height={500}
        priority={true}
        quality={100}
        className="w-full h-auto"
      />
    </div>
  );
}
