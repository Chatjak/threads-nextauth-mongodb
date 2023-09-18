"use client";

import { post } from "@/types/model";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { BsArrowRepeat, BsShare, BsThreeDots } from "react-icons/bs";
import {
  AiFillHeart,
  AiOutlineComment,
  AiOutlineDelete,
  AiOutlineHeart,
} from "react-icons/ai";
export default function Post({
  post,
  email,
}: {
  post: post;
  email?: string | null;
}) {
  const [hasLike, setHasLike] = useState<boolean | null>(null);
  const [total, setTotal] = useState<number>(0);
  let isOwner = null;
  if (email === post.user.email) {
    isOwner = true;
  } else {
    isOwner = false;
  }
  useEffect(() => {
    const total = async () => {
      await fetch(`http://localhost:8080/api/like/${post._id}/total`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((t) => setTotal(t));
    };
    const getHas = async () => {
      await fetch(`http://localhost:8080/api/like/${post._id}/hasLike`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email }),
      })
        .then((res) => res.json())
        .then((data) => setHasLike(data));
    };
    getHas();
    total();
  }, []);
  const createLike = async () => {
    const like = await fetch(`http://localhost:8080/api/like/${post._id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email }),
    });
    if (!like.ok) {
      throw new Error();
    }
    setTotal((t) => t + 1);
    setHasLike(true);
  };
  return (
    <div className="flex py-4 border-b">
      <div className="w-11 h-11">
        <Image
          src={post.user.image}
          alt=""
          width={44}
          height={44}
          className="rounded-full object-cover"
        />
      </div>
      <div className="flex flex-col flex-1  p-2">
        <div className="flex items-center justify-between w-full">
          <Link
            href={`/${post.user.name}`}
            className="font-bold hover:underline"
          >
            {post.user.name}
          </Link>
          <div className="flex items-center">
            <p className="font-light mr-2">
              {moment(post.createdAt).fromNow(true)}
            </p>
            <BsThreeDots />
          </div>
        </div>
        <div className=" w-full my-4">{post.description}</div>
        <div className="flex w-full">
          {hasLike ? (
            <AiFillHeart className={`text-xl mr-4 text-red-600`} />
          ) : (
            <AiOutlineHeart
              className={`text-xl mr-4 cursor-pointer`}
              onClick={createLike}
            />
          )}
          <AiOutlineComment className={`text-xl mr-4`} />
          {isOwner ? (
            <AiOutlineDelete className={`text-xl mr-4`} />
          ) : (
            <BsArrowRepeat className={`text-xl mr-4`} />
          )}
          <BsShare className={`text-xl mr-4`} />
        </div>
        <p className="font-light">{total} likes</p>
      </div>
    </div>
  );
}
