import { useState, type FC, type FormEventHandler } from 'react';
import { GitMerge } from 'react-feather';
import { decodeBase64 } from '../../../context/utilities/base64utilities';
import useEditorContext from '../../../context/hooks/useEditorContext';
import { toast } from 'react-toastify';
import { TextInput } from '../input/TextInput';
import { useTemporaryError } from '../../hooks/useTemporaryError';

type FormState = {
    url: string;
};

export const MergeIn: FC = () => {
    const [showForm, setShowForm] = useState(false);
    const [formState, setFormState] = useState<FormState>({
        url: '',
    });
    const { error, setError, clearError } = useTemporaryError(1000);

    const { text, setText } = useEditorContext();

    const resetUrlFieldValue = (): void => {
        setFormState((current) => ({
            ...current,
            url: '',
        }));
    };

    const onFormSubmit: FormEventHandler<HTMLFormElement> = (event) => {
        // Prevent submitting to server
        event.preventDefault();

        if (!formState.url) {
            setError('no url');

            return;
        }

        let url: URL;
        try {
            url = new URL(formState.url);
        } catch {
            resetUrlFieldValue();

            setError('invalid url');

            return;
        }

        const searchParams = url.searchParams;

        const encodedIncomingText = searchParams.get('text');
        if (!encodedIncomingText) {
            resetUrlFieldValue();

            setError('no text param');

            return;
        }

        try {
            const incomingText = decodeBase64(encodedIncomingText);

            setText(text + '\n' + incomingText);

            toast.success('Content merged in at the bottom');

            clearError();
            resetUrlFieldValue();
        } catch {
            resetUrlFieldValue();

            setError('could not decode');

            return;
        }
    };

    if (showForm) {
        return (
            <form className="flex gap-2 items-center" onSubmit={onFormSubmit}>
                <TextInput
                    autoFocus
                    placeholder="paste the url here.."
                    className="px-2 py-1"
                    value={formState.url}
                    onChange={(value) => {
                        setFormState({ url: value });
                    }}
                    label="url"
                    error={error || undefined}
                />
                <button
                    type="submit"
                    className="bg-white opacity-60 hover:opacity-100 cursor-pointer px-2 py-1 text-nowrap"
                >
                    merge in
                </button>
                <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="cursor-pointer opacity-50 hover:opacity-100 text-sm"
                >
                    cancel
                </button>
            </form>
        );
    }

    return (
        <button
            type="button"
            className="cursor-pointer"
            title="Merge in other list"
            onClick={() => setShowForm(true)}
        >
            <GitMerge size={14} />
        </button>
    );
};
