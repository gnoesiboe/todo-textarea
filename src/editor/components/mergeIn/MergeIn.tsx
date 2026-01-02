import { useState, type FC, type FormEventHandler } from 'react';
import { GitMerge } from 'react-feather';
import { decodeBase64 } from '../../../context/utilities/base64utilities';
import useEditorContext from '../../../context/hooks/useEditorContext';
import { toast } from 'react-toastify';

type FormState = {
    url: string;
};

export const MergeIn: FC = () => {
    const [showForm, setShowForm] = useState(false);
    const [formState, setFormState] = useState<FormState>({
        url: '',
    });

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
            toast.warning('no url provided');

            return;
        }

        let url: URL;
        try {
            url = new URL(formState.url);
        } catch {
            resetUrlFieldValue();

            toast.warning('Could not parse url');

            return;
        }

        const searchParams = url.searchParams;

        const encodedIncomingText = searchParams.get('text');
        if (!encodedIncomingText) {
            resetUrlFieldValue();

            toast.warning("URL does not have a 'text' query param to parse");

            return;
        }

        try {
            const incomingText = decodeBase64(encodedIncomingText);

            setText(text + '\n' + incomingText);

            toast.success('Content merged in at the bottom');

            resetUrlFieldValue();
        } catch {
            resetUrlFieldValue();

            toast.warning('Could not decode text query param');

            return;
        }
    };

    if (showForm) {
        return (
            <form className="flex gap-2 items-center" onSubmit={onFormSubmit}>
                <input
                    autoFocus
                    type="text"
                    aria-label="url"
                    placeholder="paste the url here.."
                    className="px-2 py-1"
                    value={formState.url}
                    onChange={(event) => {
                        setFormState({
                            url: event.target.value,
                        });
                    }}
                />
                <button
                    type="submit"
                    className="bg-white opacity-60 hover:opacity-100 cursor-pointer p-1"
                >
                    save
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
