import { Sentence } from '../editor/model/Sentence';

export function splitTextInSentences(text: string): Sentence[] {
    const rawSentences = text.split('\n');

    const sentences: Sentence[] = [];

    rawSentences.forEach((text, index) => {
        let isTodo: boolean;
        if (index >= 2) {
            // Is todo when two previous lines are empty
            isTodo =
                !text.startsWith('#') &&
                sentences[index - 1].text.trim().length === 0 &&
                sentences[index - 2].text.trim().length === 0;
        } else if (index === 0) {
            isTodo = text.trim().length > 0 && !text.trim().startsWith('#');
        } else if (index === 1) {
            isTodo =
                sentences[0].text.trim().length === 0 && text.trim().length > 0;
        } else {
            throw new Error('Should not get to this point');
        }

        const sentence = new Sentence(text, isTodo);

        sentences.push(sentence);
    });

    // Ensure that, if there are two lines behind each other, the last line is only todo
    sentences.forEach((sentence, index) => {
        const previousSentence = index > 0 ? sentences[index - 1] : null;
        if (!previousSentence) {
            return;
        }

        if (previousSentence.isTodo && sentence.isTodo) {
            previousSentence.clearTodoSatus();
        }
    });

    return sentences;
}
