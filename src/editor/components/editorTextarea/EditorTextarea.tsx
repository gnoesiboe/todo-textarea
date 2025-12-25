import type { CSSProperties, FC } from 'react';
import { transformToHtml } from './transformer/textToHtmlTransformer';
import useEditorContext from '../../../context/hooks/useEditorContext';
import { composeClassnames } from '../../../utilities/classNameUtilities';

type Props = {
    sharedStyle: CSSProperties;
};

const EditorTextarea: FC<Props> = ({ sharedStyle }) => {
    const { text, setText } = useEditorContext();

    const sharedClassNames =
        'w-full h-full border-0 p-0 bg-transparent mt-5 font-mono absolute top-0 left-0 text-sm line leading-6';

    return (
        <div className="w-full bg-white h-screen relative">
            <div
                className={composeClassnames(
                    sharedClassNames,
                    'overflow-scroll',
                )}
                style={sharedStyle}
                dangerouslySetInnerHTML={{ __html: transformToHtml(text) }}
            />
            <textarea
                className={composeClassnames(
                    sharedClassNames,
                    'text-transparent caret-black focus:outline-none focus:ring-0 resize-none',
                )}
                spellCheck={false}
                style={sharedStyle}
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
        </div>
    );
};

export default EditorTextarea;
