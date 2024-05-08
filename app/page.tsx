import Image from "next/image";
import  EntityTable  from "@/components/EntityTable";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import {PlusIcon} from '@radix-ui/react-icons'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center px-24">
      <div className="flex items-end justify-end py-12">
        <Link href={'/create'}><Button >Create Entity {" "} <PlusIcon /></Button></Link>
      </div>
      <EntityTable />
    </main>
  );
}
