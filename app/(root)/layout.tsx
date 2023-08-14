import React from 'react'
import {auth} from "@clerk/nextjs";
import { redirect } from 'next/navigation';
import prisma from "@/lib/prismadb"

interface Props {
    children: React.ReactNode;
}

const SetupLayout: React.FC<Props> = async ({children}) => {

    const {userId} = auth();

    if(!userId) {
        redirect("/sign-in")
    }

    const store = await prisma.store.findFirst({
        where: {
            userId
        }
    })

    if(store) {
        redirect(`/${store.id}`)
    }

  return (
    <>{children}</>
  )
}

export default SetupLayout