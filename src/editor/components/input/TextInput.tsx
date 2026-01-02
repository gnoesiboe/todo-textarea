import type { FC, InputHTMLAttributes } from 'react';
import { AlertTriangle } from 'react-feather';

type Props = Pick<
    InputHTMLAttributes<HTMLInputElement>,
    'value' | 'className' | 'placeholder' | 'title' | 'autoFocus'
> & {
    label: string;
    onChange: (newValue: string) => void;
    error?: string;
};

export const TextInput: FC<Props> = ({
    label,
    onChange: onChangeHandler,
    error,
    ...inputProps
}) => {
    return (
        <span className="flex gap-2 items-center">
            <input
                {...inputProps}
                type="text"
                aria-label={label}
                onChange={(event) => onChangeHandler(event.target.value)}
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
