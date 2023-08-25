import React from 'react';
import {useParams} from "next/navigation";
import useOrigin from "@/hooks/use-origin";
import ApiAlert from "@/components/ui/api-alert";

interface Props {
    entityName: string;
    entityIdName: string
}

const ApiList: React.FC<Props> = ({entityIdName, entityName}) => {

    const params = useParams();
    const origin = useOrigin();

    const baseUrl = `${origin}/api/${params.storeId}`

    return (
        <>
            <ApiAlert
                title="GET"
                variant="public"
                description={`${baseUrl}/${entityName}`}
            />
            <ApiAlert
                title="GET"
                variant="public"
                description={`${baseUrl}/${entityName}/{${entityIdName}}`}
            />
            <ApiAlert
                title="POST"
                variant="admin"
                description={`${baseUrl}/${entityName}`}
            />
            <ApiAlert
                title="PATCh"
                variant="admin"
                description={`${baseUrl}/${entityName}/{${entityIdName}}`}
            />
            <ApiAlert
                title="DELETE"
                variant="admin"
                description={`${baseUrl}/${entityName}/{${entityIdName}}`}
            />
        </>
    );
};

export default ApiList;
