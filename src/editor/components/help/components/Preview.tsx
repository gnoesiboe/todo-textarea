import type { FC } from 'react';
import { transformToHtml } from '../../editorTextarea/transformer/textToHtmlTransformer';

type Props = {
    value: string;
};

export const Preview: FC<Props> = ({ value }) => (
    <div
        dangerouslySetInnerHTML={{
            __html: transformToHtml(value, null),
        }}
    />
);
