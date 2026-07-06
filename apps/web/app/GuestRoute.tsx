"use client";

import { useEffect } from "react";

import { useRouter } from "next/navigation";

import { LoadingSpinner } from "~/components/LoadingSpinner";

import { useAuth } from "~/app/AuthProvider";

export default function GuestRoute({
    children,
}:{
    children:React.ReactNode;
}){

    const router=useRouter();

    const{
        user,
        isLoading,
    }=useAuth();

    useEffect(()=>{

        if(!isLoading && user){

            router.replace("/dashboard");

        }

    },[
        user,
        isLoading,
        router
    ]);

    if(isLoading){

        return <LoadingSpinner/>

    }

    if(user){

        return null;

    }

    return <>{children}</>;
}