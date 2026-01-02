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

    return (
        <form
            className="flex justify-end gap-2 bg-stone-400 p-2"
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

                if (document.activeElement instanceof HTMLInputElement) {
                    document.activeElement.blur();
                }
            }}
        >
            <input
                type="text"
                value={formState.title}
                aria-label="title"
                placeholder="Title"
                className="p-1 bg-transparent border border-stone-400 hover:border-stone-300 rounded border-dashed cursor-text text-stone-100 focus:outline-0 text-right"
                onChange={(event) => {
                    setFormState((current) => ({
                        ...current,
                        title: event.target.value,
                    }));
                }}
                title="Edit title"
            />
        </form>
    );
};
