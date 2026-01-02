import { useEffect } from 'react';
import { encodeBase64 } from '../utilities/base64utilities';

const persistTimeoutInMs = 1000;

export function usePersistStateToUrl(text: string): void {
    useEffect(() => {
        const handle = setTimeout(() => {
            // eslint-disable-next-line no-console
            console.debug('persist @', new Date().getTime());

            const url = new URL(window.location.toString());
            url.searchParams.set('text', encodeBase64(text));
            history.replaceState({}, '', url);
        }, persistTimeoutInMs);

        return () => clearTimeout(handle);
    }, [text]);
}
