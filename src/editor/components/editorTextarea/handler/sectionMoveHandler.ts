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
    let newSections = splitSeparateSections(text);

    let lengthLeft = textareaEl.selectionStart;
    let currentIndexOfSection = -1;

    newSections.forEach((section, index) => {
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

    if (newIndexOfSection < 0 || newIndexOfSection >= newSections.length) {
        // eslint-disable-next-line no-console
        console.warn('Move out of bounds', newIndexOfSection);

        return { newText: text, newSelectionStart: textareaEl.selectionStart };
    }

    // Extract the currently selected section
    const extractedSections = newSections.splice(currentIndexOfSection, 1);

    // Re-insert the extract section in it's new position
    newSections.splice(newIndexOfSection, 0, extractedSections[0]);

    let newSelectionStart = 0;
    for (let i = 0, l = newSections.length; i < l; i += 1) {
        if (i < newIndexOfSection) {
            newSelectionStart += newSections[i].length;
        } else {
            break;
        }
    }

    // ensure each section has two enters at the end
    for (let i = 0, l = newSections.length; i < l; i++) {
        const section = newSections[i];

        if (!section.endsWith('\n\n')) {
            // TODO: support for last index needed?

            if (!section.endsWith('\n')) {
                newSections[i] += '\n\n\n';
            } else if (section.endsWith('\n')) {
                newSections[i] += '\n\n';
            } else if (section.endsWith('\n\n')) {
                newSections[i] += '\n';
            }
        }
    }

    // remove any empty sections
    newSections = newSections.filter((section) => {
        return section.split('\n').join('').trim().length > 0;
    });

    return {
        newText: newSections.join(''),
        newSelectionStart,
    };
}
