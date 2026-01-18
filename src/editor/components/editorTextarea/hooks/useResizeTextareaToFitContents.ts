import { useCallback, useEffect } from 'react';

export function useResizeTextareaToFitContents(
    textareaEl: HTMLTextAreaElement | null,
    sharedStyle: React.CSSProperties,
): () => void {
    const resizeTextareaToContents = useCallback((): void => {
        if (!textareaEl) {
            // eslint-disable-next-line no-console
            console.warn('no textarea ref, so cannot resize textarea');

            return;
        }

        textareaEl.style.height = '1px';

        const newHeight =
            Number(sharedStyle.lineHeight?.toString().slice(0, -2)) +
            textareaEl.scrollHeight +
            'px';

        textareaEl.style.height = newHeight;
    }, [sharedStyle.lineHeight, textareaEl]);

    useEffect(() => resizeTextareaToContents(), [resizeTextareaToContents]);

    return resizeTextareaToContents;
}
