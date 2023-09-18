import Image from "next/image";
import HomePage from "./components/HomePage";
import { getServerSession } from 'next-auth'
import Create from "./components/Create";
export default async function Home() {
  const session = await getServerSession()
  return (<>
    <HomePage />
    <Create />
  </>)
}
