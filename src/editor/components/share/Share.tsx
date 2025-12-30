import type { FC } from 'react';
import { Share2 as ShareIcon } from 'react-feather';

export const Share: FC = () => {
    const urlParams = new URLSearchParams({
        subject: 'Todo list',
        body: window.location.toString(),
    });
    const href = `mailto:?${urlParams.toString()}`;

    return (
        <a
            href={href}
            className="p-4 cursor-pointer"
            target="_blank"
            rel="noreferrer noopener"
            onClick={(event) => {
                event.stopPropagation();
            }}
        >
            <ShareIcon size={13} />
        </a>
    );
};
