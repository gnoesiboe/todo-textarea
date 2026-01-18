import type { KeyboardEventHandler } from 'react';
import { moveSection } from '../handler/sectionMoveHandler';
import useEditorContext from '../../../../context/hooks/useEditorContext';

export function useMoveTodosUpAndDown(
    textareaEl: HTMLTextAreaElement | null,
): KeyboardEventHandler<HTMLTextAreaElement> {
    const { text, setText } = useEditorContext();

    const onKeyUp: KeyboardEventHandler<HTMLTextAreaElement> = (event) => {
        if (!textareaEl) {
            // eslint-disable-next-line no-console
            console.warn('Textarea element is not available somehow');

            return;
        }

        if (
            !event.ctrlKey ||
            !event.shiftKey ||
            !['ArrowUp', 'ArrowDown'].includes(event.key)
        ) {
            return;
        }

        event.preventDefault();
        event.stopPropagation();

        const { newText, newSelectionStart } = moveSection(
            text,
            textareaEl,
            event.key === 'ArrowUp' ? 'up' : 'down',
        );

        setText(newText);

        setTimeout(() => {
            textareaEl.setSelectionRange(newSelectionStart, newSelectionStart);
        });
    };

    return onKeyUp;
}
