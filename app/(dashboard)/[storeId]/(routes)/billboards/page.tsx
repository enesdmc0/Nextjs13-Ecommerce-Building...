import React from 'react';
import BillboardClient from "@/app/(dashboard)/[storeId]/(routes)/billboards/components/Client";
import prisma from "@/lib/prismadb";
import {BillboardColumn} from "@/app/(dashboard)/[storeId]/(routes)/billboards/components/Columns";
import {format} from "date-fns"

const BillboardsPage = async ({params}: {params: {storeId: string}}) => {
    const billboards = await prisma?.billboard.findMany({
        where: {
            storeId: params.storeId
        },
        orderBy: {
            createdAt: "desc"
        }
    })
    const formattedBillboards: BillboardColumn[] = billboards.map(item => ({
        id: item.id,
        label: item.label,
        createdAt: format(item.createdAt, "MMMM do, yyyyy")
    }))

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6" >
                <BillboardClient data={formattedBillboards} />
            </div>
        </div>
    );
};

export default BillboardsPage;
