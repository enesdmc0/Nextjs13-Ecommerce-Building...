import React from 'react';

interface Props {
    title: string;
    description: string;
}

const Heading: React.FC<Props> = ({description, title}) => {
    return (
        <div>
            <h2 className="font-bold text-3xl tracking-tight">{title}</h2>
            <p className="text-sm text-muted-foreground">
                {description}
            </p>
        </div>
    );
};

export default Heading;
