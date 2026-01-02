import { useEffect } from 'react';

export function useSetTitle(): void {
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);

        const title = urlParams.get('title') || 'Todo';

        document.title = title;
    }, []);
}
