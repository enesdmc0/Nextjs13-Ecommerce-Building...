"use client"
import React from 'react';
import {toast} from "react-hot-toast";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";
import {Copy, Server} from "lucide-react";
import {Badge, BadgeProps} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";


interface Props {
    title: string;
    description: string;
    variant: "public" | "admin";
}

const textMap: Record<Props["variant"], string> = {
    public: "Public",
    admin: "Admin"
}

const variantMap: Record<Props["variant"], BadgeProps["variant"]> = {
    public: "secondary",
    admin: "destructive"
}



const ApiAlert: React.FC<Props> = ({variant, title, description}) => {

    const onCopy = (description: string) => {
        navigator.clipboard.writeText(description)
        toast.success("Apı Route copied to clipboard")
    }


    return (
        <Alert>
            <Server className="h-4 w-4"/>
            <AlertTitle className="flex items-center gap-x-2" >
                {title}
                <Badge variant={variantMap[variant]}>
                    {textMap[variant]}
                </Badge>
            </AlertTitle>
            <AlertDescription className="mt-4 flex items-center justify-between">
                <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
                    {description}
                </code>
                <Button variant="outline" size="sm" onClick={() => onCopy(description)}>
                    <Copy className="h-4 w-4"/>
                </Button>
            </AlertDescription>
        </Alert>
    );
};

export default ApiAlert;
