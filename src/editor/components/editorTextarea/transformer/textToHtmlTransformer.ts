import { composeClassnames } from '../../../../utilities/classNameUtilities';
import { splitTextInSentences } from '../../../../utilities/textUtilities';

type TransformerDriver = (
    text: string,
    settings: {
        lineIndex: number;
        currentLineIndex: number | null;
        sentenceIsTodo: boolean;
    },
) => string;

export const isDoneRegex = /@done/;

const primaryHeaderDriver: TransformerDriver = (
    text,
    { lineIndex, currentLineIndex },
) => {
    const expectedPrefix = '# ';

    if (!text.startsWith(expectedPrefix)) {
        return text;
    }

    const isCurrentLine = lineIndex === currentLineIndex;

    const className = composeClassnames(
        'border-b-1 border-bone-400 bg-stone-100',
        isDoneRegex.test(text) && !isCurrentLine
            ? 'text-stone-600'
            : 'text-black font-bold',
    );

    const content = text.slice(expectedPrefix.length);

    return `<h1 class="${className}">${expectedPrefix}${content}</h1>`;
};

const secondaryHeaderDriver: TransformerDriver = (text) => {
    const expectedPrefix = '## ';

    if (!text.startsWith(expectedPrefix)) {
        return text;
    }

    return `<h2 class="underline underline-offset-3 decoration-1 font-bold">${text}</h2>`;
};

const emptyLineDriver: TransformerDriver = (text) => {
    if (text.trim() !== '') {
        return text;
    }

    return '<br />';
};

const urlDriver: TransformerDriver = (text) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;

    if (urlRegex.test(text)) {
        return text.replaceAll(
            urlRegex,
            '<span class="text-blue-600 underline" target="_blank" rel="noopener noreferrer">$1</span>',
        );
    }

    return text;
};

const inlineCodeDriver: TransformerDriver = (text) => {
    const regex = /(`[^`]+`)/g;

    if (regex.test(text)) {
        return text.replace(
            regex,
            `<code class="bg-slate-200 rounded text-inherit">$1</code>`,
        );
    }

    return text;
};

const openSecondaryTodoDriver: TransformerDriver = (text) => {
    if (text.startsWith('- [ ] ')) {
        const content = text.slice(6);

        return `<div><span class="text-slate-300">- [ ]</span> <span class="text-slate-700">${content}</span></div>`;
    }

    return text;
};

const doneSecondaryTodoDriver: TransformerDriver = (text) => {
    if (text.startsWith('- [x] ')) {
        const content = text.slice(6);

        return `<div><span class="text-slate-300">- [x]</span> <span class="italic line-through decoration-1">${content}</span></div>`;
    }

    return text;
};

const listItemDriver: TransformerDriver = (text) => {
    const listItemRegex = /^[ ]*- /;

    if (listItemRegex.test(text)) {
        const prefix = (text.match(listItemRegex)?.[0] ?? '').replaceAll(
            ' ',
            '&nbsp;',
        );

        const content = text.replace(listItemRegex, '');

        return `<div><span class="text-slate-200">${prefix}</span>${content}</div>`;
    }

    return text;
};

const horizontalRuleDriver: TransformerDriver = (
    text,
    { lineIndex, currentLineIndex },
) => {
    if (!text.startsWith('---')) {
        return text;
    }

    const isCurrentLine = lineIndex === currentLineIndex;

    return `<span class="text-slate-300">${isCurrentLine ? text : '–'.repeat(text.length)}</span>`;
};

const fallbackDriver: TransformerDriver = (text) => {
    return `<div class="text-slate-600">${text}</div>`;
};

const flagDriver: TransformerDriver = (text) => {
    const flagRegex1 = /(@[a-z0-9-]+\([^)]*\))/gi;
    const flagRegex2 = /(@[a-z0-9-]+)/gi;

    const className = 'text-orange-400 italic';

    return text
        .replaceAll(flagRegex1, `<span class="${className}">$1</span>`)
        .replaceAll(flagRegex2, `<span class="${className}">$1</span>`);
};

const primaryTodoDriver: TransformerDriver = (
    text,
    { sentenceIsTodo: isTodo },
) => {
    if (!isTodo) {
        return text;
    }

    if (text.trim().length === 0) {
        return text;
    }

    const isDone = isDoneRegex.test(text);

    const className = composeClassnames({
        'line-through': isDone,
        'font-bold': !isDone,
    });

    return `<span class="${className}" data-id="todo">${text}</span>`;
};

const quoteDriver: TransformerDriver = (text) => {
    if (!text.startsWith('> ')) {
        return text;
    }

    return `<blockquote class="italic text-slate-500">${text}</blockquote>`;
};

const createImportantDriver = (
    numberOfExclamations: number,
    bgColorClassName: string,
): TransformerDriver => {
    return (text) => {
        const exclamations = '!'.repeat(numberOfExclamations);

        const match = `[${exclamations}]`;

        const className = composeClassnames(
            bgColorClassName,
            'rounded text-transparent',
        );

        return text.replace(
            match,
            `<span class="${className}">[<span class="text-slate-800">${exclamations}</span>]</span>`,
        );
    };
};

const drivers: ReadonlyArray<TransformerDriver> = [
    primaryHeaderDriver,
    secondaryHeaderDriver,
    primaryTodoDriver,
    quoteDriver,
    doneSecondaryTodoDriver,
    openSecondaryTodoDriver,
    listItemDriver, // Keep behind todo drivers
    horizontalRuleDriver,
    flagDriver,
    urlDriver,
    createImportantDriver(2, 'bg-red-200'),
    createImportantDriver(1, 'bg-orange-200'),
    inlineCodeDriver,
    emptyLineDriver,
    fallbackDriver, // Keep this last
];

export function transformToHtml(
    text: string,
    currentLineIndex: number | null,
    includePrimaryTodoDriver: boolean,
): string {
    const sentences = splitTextInSentences(text);

    const driversToApply = includePrimaryTodoDriver
        ? drivers
        : drivers.filter((d) => d !== primaryTodoDriver);

    return sentences
        .map((sentence, index) => {
            return driversToApply.reduce((currentSentenceText, driver) => {
                const transformedLine = driver(currentSentenceText, {
                    lineIndex: index,
                    currentLineIndex,
                    sentenceIsTodo: sentence.isTodo,
                });

                return transformedLine;
            }, sentence.text);
        })
        .join('');
}
