import {
    useCallback,
    useEffect,
    useRef,
    type CSSProperties,
    type FC,
} from 'react';
import { transformToHtml } from './transformer/textToHtmlTransformer';
import useEditorContext from '../../../context/hooks/useEditorContext';
import { composeClassnames } from '../../../utilities/classNameUtilities';
import { useDetermineCurrentLineNumber } from './hooks/useDetermineCurrentLineNumber';

type Props = {
    sharedStyle: CSSProperties;
};

const EditorTextarea: FC<Props> = ({ sharedStyle }) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const { text, setText } = useEditorContext();

    useDetermineCurrentLineNumber(textareaRef.current || null);

    const resizeTextareaToContents = useCallback((): void => {
        if (!textareaRef.current) {
            // eslint-disable-next-line no-console
            console.warn('no textarea ref, so cannot resize textarea');

            return;
        }

        textareaRef.current.style.height = '1px';

        const newHeight =
            Number(sharedStyle.lineHeight?.toString().slice(0, -2)) +
            textareaRef.current.scrollHeight +
            'px';

        textareaRef.current.style.height = newHeight;
    }, [sharedStyle.lineHeight]);

    useEffect(() => resizeTextareaToContents(), [resizeTextareaToContents]);

    const sharedClassNames =
        'w-full border-0 p-0 bg-transparent mt-5 font-mono absolute top-0 left-0 text-sm line leading-6';

    return (
        <div className="w-full bg-white h-screen relative">
            <div
                className={composeClassnames(sharedClassNames)}
                style={sharedStyle}
                dangerouslySetInnerHTML={{ __html: transformToHtml(text) }}
            />
            <textarea
                className={composeClassnames(
                    sharedClassNames,
                    'text-transparent caret-black focus:outline-none focus:ring-0 resize-none overflow-hidden',
                )}
                spellCheck={false}
                style={sharedStyle}
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyUp={() => resizeTextareaToContents()}
                ref={textareaRef}
            />
        </div>
    );
};

export default EditorTextarea;
