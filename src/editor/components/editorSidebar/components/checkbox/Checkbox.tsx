import type { ChangeEventHandler, FC } from 'react';
import useEditorContext from '../../../../../context/hooks/useEditorContext';
import { formatAsDateTime } from '../../../../../utilities/dateTimeUtilities';
import { isDoneRegex } from '../../../editorTextarea/transformer/textToHtmlTransformer';
import { composeClassnames } from '../../../../../utilities/classNameUtilities';

type Props = {
    checked: boolean;
    index: number;
};

const Checkbox: FC<Props> = ({ checked, index }) => {
    const { text, setText } = useEditorContext();

    const onChange: ChangeEventHandler<HTMLInputElement> = (event) => {
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

        // Blur field afterwards
        event.target.blur();
    };

    const className = composeClassnames('text-right -mt-0.5 cursor-pointer', {
        'opacity-20 hover:opacity-100': checked,
    });

    return (
        <label className={className}>
            <input type="checkbox" checked={checked} onChange={onChange} />
        </label>
    );
};

export default Checkbox;
