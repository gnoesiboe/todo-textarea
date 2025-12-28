import type { FC, ReactNode } from 'react';

type Props = {
    children: ReactNode;
};

export const Description: FC<Props> = ({ children }) => {
    return (
        <div className="col-span-1 md:col-span-3 space-y-2">{children} </div>
    );
};
