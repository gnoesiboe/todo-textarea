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

type Props = Pick<HTMLAttributes<HTMLDivElement>, 'className' | 'style'> & {
    text: string;
};

function determineLines(
    sentences: Sentence[],
    numberOfCharsPerLine: number,
): string[] {
    return sentences.reduce((accumulator: string[], line) => {
        const splitLines = line.getLines(numberOfCharsPerLine);

        return [...accumulator, ...splitLines];
    }, []);
}

const EditorSidebar: FC<Props> = ({ text, ...divProps }) => {
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
    const lines = determineLines(sentences, numberOfCharsPerLine ?? Infinity);

    const elements: ReactElement[] = lines.map((line, index) => {
        const trimmedLine = line.trim();

        if (trimmedLine.startsWith('#')) {
            const checked = /@done/.test(trimmedLine);

            return (
                <label key={index}>
                    <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => {
                            // @todo implement
                        }}
                    />
                </label>
            );
        }

        return <div key={index}>&nbsp;</div>;
    });

    return <div {...divProps}>{...elements}</div>;
};

export default EditorSidebar;
