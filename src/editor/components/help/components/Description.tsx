import type { FC, ReactNode } from 'react';

type Props = {
    children: ReactNode;
};

export const Description: FC<Props> = ({ children }) => {
    return (
        <div className="col-span-1 sm:col-span-3 space-y-4 border rounded border-slate-300 p-4 mb-4 sm:mb-0">
            {children}{' '}
        </div>
    );
};
