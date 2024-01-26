import TossForm from "@/components/home/TossForm";
import { ModeToggle } from "@/components/nav/ModeToggle";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between md:p-24 pt-24 px-4 md:pb-0">
      <Image src={"/logo.png"} alt="Next.js logo" width={100} height={100} />
      <TossForm />
      <div className="my-5"></div>
      <ModeToggle />
      <div className="pb-20"></div>
      <p className=" pb-4 text-slate-600">
        &copy; All rights reserved @
        <a
          href="http://www.motalibpathan.vercel.app"
          className="text-blue-500 hover:underline"
        >
          Motalib Pathan
        </a>
      </p>
    </main>
  );
}
