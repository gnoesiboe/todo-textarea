import { useEffect, useState } from 'react';

type Output = {
    title: string;
    setTitle: (value: string) => void;
};

export function useTitle(): Output {
    const [title, setTitle] = useState(() => {
        const urlParams = new URLSearchParams(window.location.search);

        return urlParams.get('title') || 'Todo';
    });

    useEffect(() => {
        document.title = title;
    }, [title]);

    return { title, setTitle };
}
