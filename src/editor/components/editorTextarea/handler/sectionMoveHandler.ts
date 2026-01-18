import { splitSeparateSections } from '../../../../utilities/textUtilities';

type Output = {
    newText: string;
    newSelectionStart: number;
};

export function moveSection(
    text: string,
    textareaEl: HTMLTextAreaElement,
    direction: 'up' | 'down',
): Output {
    const sections = splitSeparateSections(text);

    let lengthLeft = textareaEl.selectionStart;
    let currentIndexOfSection = -1;

    sections.forEach((section, index) => {
        const sectionLength = section.length;

        lengthLeft -= sectionLength;

        if (lengthLeft < 0 && currentIndexOfSection === -1) {
            currentIndexOfSection = index;
        }
    });

    if (currentIndexOfSection === -1) {
        // eslint-disable-next-line no-console
        console.warn('could not resolve current index');

        return { newText: text, newSelectionStart: textareaEl.selectionStart };
    }

    const newIndexOfSection =
        direction === 'up'
            ? currentIndexOfSection - 1
            : currentIndexOfSection + 1;

    if (newIndexOfSection < 0 || newIndexOfSection >= sections.length) {
        // eslint-disable-next-line no-console
        console.warn('Move out of bounds', newIndexOfSection);

        return { newText: text, newSelectionStart: textareaEl.selectionStart };
    }

    const extractedSections = sections.splice(currentIndexOfSection, 1);

    sections.splice(newIndexOfSection, 0, extractedSections[0]);

    let newSelectionStart = 0;
    for (let i = 0, l = sections.length; i < l; i += 1) {
        if (i < newIndexOfSection) {
            newSelectionStart += sections[i].length;
        } else {
            break;
        }
    }

    return {
        newText: sections.join(''),
        newSelectionStart,
    };
}
