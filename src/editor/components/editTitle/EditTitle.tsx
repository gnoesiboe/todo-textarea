import { useState, type FC } from 'react';
import { TextInput } from '../input/TextInput';
import { useTemporaryError } from '../../hooks/useTemporaryError';

export type OnValidSubmitHandler = (title: string) => void;

type Props = {
    title: string;
};

type FormState = {
    title: string;
};

export const EditTitle: FC<Props> = ({ title }) => {
    const [formState, setFormState] = useState<FormState>({ title: title });
    const { error, setError, clearError } = useTemporaryError(1000);

    const submit = (): void => {
        const normalizedTitle = formState.title.trim();
        if (normalizedTitle.length === 0) {
            setError('Missing');

            return;
        }

        // Update browser window title
        document.title = normalizedTitle;

        // Update state in URL
        const url = new URL(window.location.toString());
        url.searchParams.set('title', normalizedTitle);
        history.replaceState({}, '', url);

        if (document.activeElement instanceof HTMLInputElement) {
            document.activeElement.blur();
        }

        clearError();
    };

    return (
        <form
            className="flex justify-end"
            onSubmit={(event) => {
                // Prevent browser submitting to server
                event.preventDefault();

                submit();
            }}
        >
            <TextInput
                value={formState.title}
                aria-label="title"
                placeholder="Title"
                className="p-1 bg-transparent border border-stone-400 hover:border-stone-300 rounded border-dashed cursor-text text-stone-100 focus:outline-0 text-right"
                onChange={(value) => {
                    setFormState((current) => ({
                        ...current,
                        title: value,
                    }));
                }}
                onBlur={() => submit()}
                title="Edit title"
                label="title"
                error={error || undefined}
            />
        </form>
    );
};
