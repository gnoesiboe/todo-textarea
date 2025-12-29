import { type ReactElement, useEffect, useState, type FC } from 'react';
import { useWindowSize } from '@uidotdev/usehooks';
import { useTextWidth } from '@tag0/use-text-width';
import { Sentence } from '../../model/Sentence';
import Checkbox from './components/checkbox/Checkbox';
import useEditorContext from '../../../context/hooks/useEditorContext';
import Timer from './components/Timer/Timer';
import type { SharedStyle } from '../../Editor';
import { isDoneRegex } from '../editorTextarea/transformer/textToHtmlTransformer';

type Props = {
    sharedStyle: SharedStyle;
    className: string;
};

const EditorSidebar: FC<Props> = ({ className, sharedStyle }) => {
    const { text } = useEditorContext();

    const [textAreaWidth, setTextAreaWidth] = useState<number | null>(null);

    const { width: windowWidth } = useWindowSize();

    // measure a single character
    const monospaceFontWidth = useTextWidth({
        text: 'M',
        font: `${sharedStyle.fontSize} ${sharedStyle.fontFamily}`,
    });

    useEffect((): void => {
        const textAreaEl = document.getElementsByTagName('textarea')[0];
        if (!textAreaEl) {
            setTextAreaWidth(null);

            return;
        }

        const textareaWidthWithoutPadding =
            textAreaEl.clientWidth -
            parseFloat(getComputedStyle(textAreaEl).paddingLeft) -
            parseFloat(getComputedStyle(textAreaEl).paddingRight);

        setTextAreaWidth(textareaWidthWithoutPadding);
    }, [windowWidth]);

    const numberOfCharsPerLine = textAreaWidth
        ? Math.round(textAreaWidth / monospaceFontWidth)
        : null;

    const sentences = text.split('\n').map((text) => Sentence.fromText(text));

    const elements = sentences.reduce<ReactElement[]>(
        (accumulator, sentence, sentenceIndex) => {
            const lines = sentence.getLines(numberOfCharsPerLine ?? Infinity);

            lines.forEach((line, lineIndex) => {
                if (line.startsWith('## ')) {
                    const checked = isDoneRegex.test(line);

                    accumulator.push(
                        <div
                            className="flex gap-3 items-center justify-end"
                            key={`${sentenceIndex}-${lineIndex}`}
                            style={{ height: sharedStyle.lineHeight }}
                        >
                            {!checked && <Timer index={sentenceIndex} />}
                            <Checkbox checked={checked} index={sentenceIndex} />
                        </div>,
                    );
                } else {
                    accumulator.push(
                        <div key={accumulator.length}>&nbsp;</div>,
                    );
                }
            });

            return accumulator;
        },
        [],
    );

    return (
        <div style={sharedStyle} className={className}>
            {...elements}
        </div>
    );
};

export default EditorSidebar;
