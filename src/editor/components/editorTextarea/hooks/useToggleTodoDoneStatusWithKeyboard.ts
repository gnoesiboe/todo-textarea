import type { KeyboardEventHandler } from 'react';
import useEditorContext from '../../../../context/hooks/useEditorContext';
import { resolveLineToToggleDoneFor } from '../resolver/lineIndexResolver';

export function useToggleTodoDoneStatusWithKeyboard(
    textareaEl: HTMLTextAreaElement | null,
): KeyboardEventHandler<HTMLTextAreaElement> {
    const { toggleLineDoneStatus, text } = useEditorContext();

    const onKeyUp: KeyboardEventHandler<HTMLTextAreaElement> = (event) => {
        if (!textareaEl) {
            // eslint-disable-next-line no-console
            console.warn(
                'Expecting textarea element to be available at this point',
            );

            return;
        }

        if (!event.ctrlKey || event.key !== 'x') {
            return;
        }

        event.preventDefault();
        event.stopPropagation();

        const { lineIndex, selectionStart } = resolveLineToToggleDoneFor(
            text,
            textareaEl,
        );

        if (lineIndex !== -1) {
            toggleLineDoneStatus(lineIndex);

            // Selection is lost, re-set it
            setTimeout(() => {
                textareaEl.setSelectionRange(selectionStart, selectionStart);
            });
        }
    };

    return onKeyUp;
}
