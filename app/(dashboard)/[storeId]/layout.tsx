import prisma from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import Navbar from '@/components/Navbar';
import React from 'react'

interface Props {
    children: React.ReactNode;
    params: {
        storeId: string;
    }
}

const DashboardLayout: React.FC<Props> = async ({children, params}) => {

    const {userId} = auth()

    if(!userId) {
        redirect("sign-in")
    }

    const store = await prisma.store.findFirst({
        where: {
            id: params.storeId,
            userId
        }
    })

    if(!store) {
        redirect("/")
    }

  return (
    <>
    <Navbar />
    {children}
    </>
  )
}

export default DashboardLayout