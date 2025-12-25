import type { ChangeEventHandler, FC } from 'react';
import useEditorContext from '../../../../../context/hooks/useEditorContext';
import { formatAsDateTime } from '../../../../../utilities/dateTimeUtilities';
import { isDoneRegex } from '../../../editorTextarea/transformer/textToHtmlTransformer';

type Props = {
    checked: boolean;
    index: number;
};

const Checkbox: FC<Props> = ({ checked, index }) => {
    const { text, setText } = useEditorContext();

    const onChange: ChangeEventHandler<HTMLInputElement> = () => {
        const newText = text
            .split('\n')
            .map((line, lineIndex) => {
                if (lineIndex !== index) {
                    return line;
                }

                if (isDoneRegex.test(line)) {
                    return line.replace(/@done\([^)]*\)/g, '');
                }

                return `${line.trim()} @done(${formatAsDateTime(new Date())})`;
            })
            .join('\n');

        setText(newText);
    };

    return (
        <label className="text-right -mt-0.5">
            <input type="checkbox" checked={checked} onChange={onChange} />
        </label>
    );
};

export default Checkbox;
