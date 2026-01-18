import {
    useRef,
    type CSSProperties,
    type FC,
    type KeyboardEventHandler,
} from 'react';
import { transformToHtml } from './transformer/textToHtmlTransformer';
import useEditorContext from '../../../context/hooks/useEditorContext';
import { composeClassnames } from '../../../utilities/classNameUtilities';
import { useDetermineCurrentLineNumber } from './hooks/useDetermineCurrentLineNumber';
import { moveSection } from './handler/sectionMoveHandler';
import { useResizeTextareaToFitContents } from './hooks/useResizeTextareaToFitContents';

type Props = {
    sharedStyle: CSSProperties;
};

const EditorTextarea: FC<Props> = ({ sharedStyle }) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const { text, setText, currentLineIndex } = useEditorContext();

    useDetermineCurrentLineNumber(textareaRef.current || null);

    const resizeTextareaToContents = useResizeTextareaToFitContents(
        textareaRef.current,
        sharedStyle,
    );

    const sharedClassNames =
        'w-full border-0 p-0 bg-transparent mt-5 font-mono absolute top-0 left-0 text-sm line leading-6';

    const onKeyUp: KeyboardEventHandler<HTMLTextAreaElement> = (event) => {
        resizeTextareaToContents();

        if (
            !event.ctrlKey ||
            !event.shiftKey ||
            !['ArrowUp', 'ArrowDown'].includes(event.key)
        ) {
            return;
        }

        event.preventDefault();
        event.stopPropagation();

        const { newText, newSelectionStart } = moveSection(
            text,
            textareaRef.current!,
            event.key === 'ArrowUp' ? 'up' : 'down',
        );

        setText(newText);

        setTimeout(() => {
            textareaRef.current!.setSelectionRange(
                newSelectionStart,
                newSelectionStart,
            );
        }, 100);
    };

    return (
        <div className="w-full bg-white h-screen relative">
            <div
                className={composeClassnames(sharedClassNames)}
                style={sharedStyle}
                dangerouslySetInnerHTML={{
                    __html: transformToHtml(text, currentLineIndex, true),
                }}
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
                onKeyUp={onKeyUp}
                ref={textareaRef}
                placeholder="Start typing. See 'help' for available syntax."
            />
        </div>
    );
};

export default EditorTextarea;
