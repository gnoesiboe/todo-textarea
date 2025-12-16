import type { CSSProperties, FC } from 'react';
import { transformToHtml } from './transformer/textToHtmlTransformer';
import { twMerge } from 'tailwind-merge';

type Props = {
    text: string;
    onChange: (value: string) => void;
    sharedStyle: CSSProperties;
};

const EditorTextarea: FC<Props> = ({ text, onChange, sharedStyle }) => {
    const sharedClassNames =
        'w-full h-full border-0 p-0 bg-transparent mt-5 font-mono absolute top-0 left-0 text-sm line leading-6';

    return (
        <div className="w-full bg-white h-screen relative">
            <div
                className={twMerge(sharedClassNames, 'overflow-scroll')}
                style={sharedStyle}
                dangerouslySetInnerHTML={{ __html: transformToHtml(text) }}
            />
            <textarea
                className={twMerge(
                    sharedClassNames,
                    'text-transparent caret-black focus:outline-none focus:ring-0 resize-none',
                )}
                style={sharedStyle}
                value={text}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    );
};

export default EditorTextarea;
