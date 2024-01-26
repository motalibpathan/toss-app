import TossForm from "@/components/home/TossForm";
import { ModeToggle } from "@/components/nav/ModeToggle";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between md:p-24 pt-24 px-4 pb-10">
      <Image
        src={require("../public/logo.png")}
        alt="Next.js logo"
        width={100}
        height={100}
        placeholder="blur"
      />
      <TossForm />
      <div className="my-5"></div>
      <ModeToggle />
    </main>
  );
}
