import React from 'react'
import prisma from "@/lib/prismadb"
interface Props {
  params: {
    storeId: string;
  }
}

const DashboardPage: React.FC<Props> = async ({params}) => {

  const store = await prisma.store.findFirst({
    where: {
      id: params.storeId
    }
  })

  return (
    <div> Active Store: {store?.name}</div>
  )
}

export default DashboardPage