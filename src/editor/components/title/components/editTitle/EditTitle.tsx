import { useState, type FC } from 'react';

export type OnValidSubmitHandler = (title: string) => void;

type Props = {
    title: string;
};

type FormState = {
    title: string;
};

export const EditTitle: FC<Props> = ({ title }) => {
    const [formState, setFormState] = useState<FormState>({ title: title });
    const [showSubmit, setShowSubmit] = useState(false);

    return (
        <form
            className="flex justify-start gap-2 bg-amber-800 p-2"
            onSubmit={(event) => {
                // Prevent browser submitting to server
                event.preventDefault();

                const normalizedTitle = formState.title.trim();
                if (normalizedTitle.length === 0) {
                    return;
                }

                // Update browser window title
                document.title = normalizedTitle;

                // Update state in URL
                const url = new URL(window.location.toString());
                url.searchParams.set('title', normalizedTitle);
                history.pushState({}, '', url);

                setShowSubmit(false);
            }}
        >
            <input
                type="text"
                value={formState.title}
                aria-label="title"
                placeholder="Title"
                className="p-1 bg-transparent border border-amber-800 hover:border-amber-700 border-dashed cursor-text text-amber-300 focus:outline-0"
                onChange={(event) => {
                    setFormState((current) => ({
                        ...current,
                        title: event.target.value,
                    }));
                }}
                onFocus={() => setShowSubmit(true)}
                onBlur={() => setShowSubmit(false)}
                title="Edit title"
            />
            {showSubmit && (
                <button
                    type="submit"
                    className="cursor-pointer bg-white opacity-60 hover:opacity-100 px-2"
                >
                    save
                </button>
            )}
        </form>
    );
};
