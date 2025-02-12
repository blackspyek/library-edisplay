import React from 'react'
import {getServerSession} from "next-auth";
import {authOptions} from "@/lib/auth";
import LogoutButton from "@/components/LogoutButton";

const Page = async () => {
    const session = await getServerSession(authOptions);
    if (!session?.user){
        return (
            <div>You need to login first</div>
        )
    }
    return (
        <>
            <div>Welcome to admin</div>
            <LogoutButton/>
        </>
    )
}
export default Page
