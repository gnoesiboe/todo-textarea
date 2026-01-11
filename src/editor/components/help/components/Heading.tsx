import type { FC } from 'react';

type Props = {
    children: string;
};

export const Heading: FC<Props> = ({ children }) => (
    <h1 className="text-lg font-semibold">{children}</h1>
);
