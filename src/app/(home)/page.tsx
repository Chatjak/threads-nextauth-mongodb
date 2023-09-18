import Image from "next/image";
import CreatePost from "../components/CreatePost";
import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession();
  return (
    <div className="">
      <CreatePost />
    </div>
  );
}
