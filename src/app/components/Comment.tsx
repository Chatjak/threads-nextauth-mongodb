import { commentType } from "@/types/model";
import React from "react";
import { BsThreeDots } from "react-icons/bs";
import Image from "next/image";
import Link from "next/link";
import moment from "moment";
export default function Comment({ comment }: { comment: commentType }) {
  return (
    <div className="flex py-4 border-b">
      <div className="w-11 h-11">
        <Image
          src={comment.user.image}
          alt=""
          width={44}
          height={44}
          className="rounded-full object-cover"
        />
      </div>
      <div className="flex flex-col flex-1  p-2">
        <div className="flex items-center justify-between w-full">
          <Link
            href={`/${comment.user.name}`}
            className="font-bold hover:underline"
          >
            {comment.user.name}
          </Link>
          <div className="flex items-center">
            <p className="font-light mr-2">
              {moment(comment.createdAt).fromNow(true)}
            </p>
            <BsThreeDots />
          </div>
        </div>
        <div className=" w-full my-4">{comment.description}</div>
      </div>
    </div>
  );
}
