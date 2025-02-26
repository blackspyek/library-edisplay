import React from 'react'
import {getServerSession} from "next-auth";
import {authOptions} from "@/lib/auth";
import LogoutButton from "@/components/LogoutButton";
import Image from "next/image";
import SearchBar from "@/components/SearchBar";
import DiskSpace from "@/components/DiskSpace";
import NavBar from "@/components/NavBar";
import Aside from "@/components/Aside";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import DisplayExhibitionCards from "@/components/DisplayCards";

const Page = async () => {
    const session = await getServerSession(authOptions);
    // if (!session?.user){
    //     return (
    //         <div>You need to login first</div>
    //     )
    // }


    return (
    <>
        <DisplayExhibitionCards/>
    </>
    );
};
export default Page
