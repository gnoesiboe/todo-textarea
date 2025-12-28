import { useEffect, useRef, type RefObject } from 'react';

type Output = {
    textareaRef: RefObject<HTMLTextAreaElement | null>;
    divRef: RefObject<HTMLDivElement | null>;
};

export function useSyncScrollPosition(): Output {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const divRef = useRef<HTMLDivElement>(null);
    const isSyncingScrollPositionRef = useRef(false);

    useEffect(() => {
        if (!textareaRef.current || !divRef.current) {
            return;
        }

        const textareaEl = textareaRef.current;

        const onScroll = (): void => {
            if (!divRef.current) {
                return;
            }

            isSyncingScrollPositionRef.current = true;

            const sourceScrollable =
                textareaEl.scrollHeight - textareaEl.clientHeight;
            const targetScrollable =
                divRef.current.scrollHeight - divRef.current.clientHeight;

            if (sourceScrollable > 0) {
                const ratio = textareaEl.scrollTop / sourceScrollable;
                divRef.current.scrollTop = ratio * targetScrollable;
            }

            isSyncingScrollPositionRef.current = false;
        };

        textareaEl.addEventListener('scroll', onScroll);

        return () => {
            textareaEl.removeEventListener('scroll', onScroll);
        };
    }, []);

    return { textareaRef, divRef };
}
