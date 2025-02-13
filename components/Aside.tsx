import React from 'react'
import {BookImage, Play, User} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Aside = () => {
    return (
        <aside className="w-full md:w-1/5 flex flex-col justify-between p-10 border-r border-gray-300">
            <div className="space-y-6">
                <Link href='/' className="flex flex-row items-center gap-2 md:gap-3 lg:gap-4 text-black">
                    <Play className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10"/>
                    <p className="text-xs md:text-sm lg:text-base mt-1">Wyświetl Wystawę</p>
                </Link>
                <Link href='/admin' className="flex flex-row items-center gap-2 md:gap-3 lg:gap-4 text-black">
                    <BookImage className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10"/>
                    <p className="text-xs md:text-sm lg:text-base mt-1">Przeglądaj wystawy</p>
                </Link>
                <Link href='/profile' className="flex flex-row items-center gap-2 md:gap-3 lg:gap-4 text-black">
                    <User className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10"/>
                    <p className="text-xs md:text-sm lg:text-base mt-1">Konto</p>
                </Link>
            </div>
            <div className="border-t border-gray-300 w-full flex justify-center pt-4">
                <div className="flex items-center space-x-1">
                    <Image
                        src={'/LOGO.png'}
                        alt={'Logo MBP 39'}
                        width={100}
                        height={100}
                        className="w-full h-auto max-w-[100px] md:max-w-[150px] lg:max-w-[200px]"
                    />
                </div>
            </div>
        </aside>
    )
}
export default Aside
