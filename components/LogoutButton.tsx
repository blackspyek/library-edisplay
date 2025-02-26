
'use client';
import React from 'react'
import {Button} from "@/components/ui/button";
import {signOut} from "next-auth/react";

const LogoutButton = () => {
    return (
        <Button
            onClick={() => signOut(
                {
                    redirect: true,
                    callbackUrl: `${window.location.origin}/login`,
                }
            )}
            variant='default'

        >Wyloguj</Button>

    )
}
export default LogoutButton
