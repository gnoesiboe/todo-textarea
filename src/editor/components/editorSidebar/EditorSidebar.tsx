import {
    type FC,
    type HTMLAttributes,
    type ReactElement,
    useEffect,
    useState,
} from 'react';
import { useWindowSize } from '@uidotdev/usehooks';
import { useTextWidth } from '@tag0/use-text-width';
import { Sentence } from '../../model/Sentence';
import Checkbox from './components/Checkbox';
import useEditorContext from '../../../context/hooks/useEditorContext';

type Props = Pick<HTMLAttributes<HTMLDivElement>, 'className' | 'style'>;

const EditorSidebar: FC<Props> = (divProps) => {
    const { text } = useEditorContext();

    const [textAreaWidth, setTextAreaWidth] = useState<number | null>(null);

    const { width: windowWidth } = useWindowSize();

    // measure a single character
    const monospaceFontWidth = useTextWidth({
        text: 'M',
        font: `${divProps.style?.fontSize} ${divProps.style?.fontFamily}`,
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
    // const lines = determineLines(sentences, numberOfCharsPerLine ?? Infinity);

    const elements = sentences.reduce<ReactElement[]>(
        (accumulator, sentence, sentenceIndex) => {
            const lines = sentence.getLines(numberOfCharsPerLine ?? Infinity);

            lines.forEach((line, lineIndex) => {
                if (line.startsWith('#')) {
                    const checked = /@done/.test(line);

                    accumulator.push(
                        <Checkbox
                            key={`${sentenceIndex}-${lineIndex}`}
                            checked={checked}
                            index={sentenceIndex}
                        />,
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

    return <div {...divProps}>{...elements}</div>;
};

export default EditorSidebar;
