import type { FC } from 'react';

type Props = {
    term: string;
};

export const Term: FC<Props> = ({ term }) => {
    return (
        <div className="text-nowrap">
            <code className="text-xs font-bold">{term}</code>
        </div>
    );
};
