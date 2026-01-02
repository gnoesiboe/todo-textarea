import type { FC, InputHTMLAttributes } from 'react';
import { AlertTriangle } from 'react-feather';
import { composeClassnames } from '../../../utilities/classNameUtilities';

type Props = Pick<
    InputHTMLAttributes<HTMLInputElement>,
    'value' | 'className' | 'placeholder' | 'title' | 'autoFocus' | 'onBlur'
> & {
    label: string;
    onChange: (newValue: string) => void;
    error?: string;
};

export const TextInput: FC<Props> = ({
    label,
    onChange: onChangeHandler,
    error,
    className: additionalClassname,
    ...inputProps
}) => {
    const className = composeClassnames(additionalClassname, 'focus:ring-0');

    return (
        <span className="flex gap-2 items-center">
            <input
                {...inputProps}
                type="text"
                aria-label={label}
                onChange={(event) => onChangeHandler(event.target.value)}
                className={className}
            />
            {error && (
                <span className="text-red-600 text-sm flex gap-1 items-center">
                    <AlertTriangle size={13} />

                    {error}
                </span>
            )}
        </span>
    );
};
