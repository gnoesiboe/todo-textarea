import type { ChangeEventHandler, FC } from 'react';
import useEditorContext from '../../../../../context/hooks/useEditorContext';
import { composeClassnames } from '../../../../../utilities/classNameUtilities';

type Props = {
    checked: boolean;
    index: number;
};

const Checkbox: FC<Props> = ({ checked, index }) => {
    const { toggleLineDoneStatus } = useEditorContext();

    const onChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        toggleLineDoneStatus(index);

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
