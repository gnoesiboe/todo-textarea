import { splitSeparateSections } from '../../../../utilities/textUtilities';

export function resolveLineToToggleDoneFor(
    currentText: string,
    textareaEl: HTMLTextAreaElement,
): { lineIndex: number; selectionStart: number } {
    const sections = splitSeparateSections(currentText);

    let lengthLeft = textareaEl.selectionStart;
    let indexOfSection = -1;

    sections.forEach((section, index) => {
        const sectionLength = section.length;

        lengthLeft -= sectionLength;

        if (lengthLeft < 0 && indexOfSection === -1) {
            indexOfSection = index;
        }
    });

    const currentSelectionStart = textareaEl.selectionStart;

    if (indexOfSection === -1) {
        // eslint-disable-next-line no-console
        console.warn('coult not resolve current section index');

        return { lineIndex: -1, selectionStart: currentSelectionStart };
    }

    const sectionToToggle = sections[indexOfSection];
    if (sectionToToggle.startsWith('#')) {
        // eslint-disable-next-line no-console
        console.warn('Cannot toggle done status of heading');

        return { lineIndex: -1, selectionStart: currentSelectionStart };
    }

    const sectionsBeforeToToggle = sections.slice(0, indexOfSection);

    const lineIndex = sectionsBeforeToToggle.reduce((accumulator, section) => {
        const linesInSection = section.split('\n');

        return accumulator + linesInSection.length - 1;
    }, 0);

    const newSelectionStart = sectionsBeforeToToggle.reduce(
        (accumulator, section) => {
            return accumulator + section.length;
        },
        0,
    );

    return { lineIndex, selectionStart: newSelectionStart };
}
