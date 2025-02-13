import React from 'react'
import Image from "next/image";
import SearchBar from "@/components/SearchBar";
import DiskSpace from "@/components/DiskSpace";
import LogoutButton from "@/components/LogoutButton";

const NavBar = () => {
    return (
        <nav className={'flex justify-between items-center w-full p-10 h-1/6'}>
            <Image src={'/logoEwystawa.svg'} alt={'Logo wystawy'} width={50} height={50}/>
            <SearchBar/>
            <DiskSpace/>
            <div className={'flex items-center space-x-4'}>
                <LogoutButton/>
                <Image src={'/avatar.png'} alt={'Avatar'} width={50} height={50}/>
            </div>
        </nav>
    )
}
export default NavBar
