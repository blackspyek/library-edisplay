import Link from "next/link";
import {buttonVariants} from "@/components/ui/button";

export default function Home() {
    return (
        <div>
            <h1 className='text-4xl'>Home</h1>
            <Link href='/admin' className={buttonVariants()}>Zarządzaj ekranem</Link>
        </div>
    )

}
