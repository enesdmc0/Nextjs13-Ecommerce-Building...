import React from 'react';
import SizesClient from "@/app/(dashboard)/[storeId]/(routes)/sizes/components/Client";
import prisma from "@/lib/prismadb";
import {SizeColumn} from "@/app/(dashboard)/[storeId]/(routes)/sizes/components/Columns";
import {format} from "date-fns"

const SizesPage = async ({params}: {params: {storeId: string}}) => {
    const sizes = await prisma?.size.findMany({
        where: {
            storeId: params.storeId
        },
        orderBy: {
            createdAt: "desc"
        }
    })
    const formattedSizes: SizeColumn[] = sizes.map(item => ({
        id: item.id,
        name: item.name,
        value: item.value,
        createdAt: format(item.createdAt, "MMMM do, yyyyy")
    }))

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6" >
                <SizesClient data={formattedSizes} />
            </div>
        </div>
    );
};

export default SizesPage;
