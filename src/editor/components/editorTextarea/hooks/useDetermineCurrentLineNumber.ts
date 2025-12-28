import { useEffect } from 'react';
import useEditorContext from '../../../../context/hooks/useEditorContext';

function determineCurrentLineIndex(textareaEl: HTMLTextAreaElement): number {
    const cursorPos = textareaEl.selectionStart;
    const textBeforeCursor = textareaEl.value.substring(0, cursorPos);

    return textBeforeCursor.split('\n').length - 1;
}

export function useDetermineCurrentLineNumber(
    textareaEl: HTMLTextAreaElement | null,
): void {
    const { setCurrentLineIndex } = useEditorContext();

    useEffect(() => {
        if (!textareaEl) {
            setCurrentLineIndex(null);

            return;
        }

        const onKeyUp = (): void => {
            setCurrentLineIndex(determineCurrentLineIndex(textareaEl));
        };

        const onClick = (): void => {
            setCurrentLineIndex(determineCurrentLineIndex(textareaEl));
        };

        textareaEl.addEventListener('keyup', onKeyUp);
        textareaEl.addEventListener('click', onClick);

        return () => {
            textareaEl.removeEventListener('keyup', onKeyUp);
            textareaEl.removeEventListener('click', onClick);
        };
    }, [textareaEl, setCurrentLineIndex]);
}
