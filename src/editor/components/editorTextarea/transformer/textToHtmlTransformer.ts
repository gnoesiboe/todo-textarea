import { composeClassnames } from '../../../../utilities/classNameUtilities';

type TransformerDriver = (
    text: string,
    lineIndex: number,
    currentLineIndex: number | null,
) => string;

export const isDoneRegex = /@done/;

const primaryHeaderDriver: TransformerDriver = (
    text,
    lineIndex,
    currentLineIndex,
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

const primaryTodoDriver: TransformerDriver = (text) => {
    const expectedPrefix = '## ';

    if (!text.startsWith(expectedPrefix)) {
        return text;
    }

    const className = composeClassnames(
        isDoneRegex.test(text)
            ? 'text-slate-600 line-through'
            : 'text-slate-800 font-bold',
    );

    const content = text.slice(2);

    return `<h2><span class="text-slate-400">${expectedPrefix}</span><span class="${className}">${content}</span></h2>`;
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
            `<code class="bg-slate-200 italic text-xs">$1</code>`,
        );
    }

    return text;
};

const openTodoDriver: TransformerDriver = (text) => {
    if (text.startsWith('- [ ] ')) {
        const content = text.slice(6);

        return `<div><span class="text-slate-300">- [ ]</span> <span class="text-slate-700">${content}</span></div>`;
    }

    return text;
};

const doneTodoDriver: TransformerDriver = (text) => {
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
    lineIndex,
    currentLineIndex,
) => {
    if (/^---+$/.test(text.trim())) {
        const isCurrentLine = lineIndex === currentLineIndex;

        if (isCurrentLine) {
            return `<div class="text-slate-300">${text}</div>`;
        } else {
            return `<div class="border-b border-slate-300">${'&nbsp;'.repeat(
                text.length,
            )}</div>`;
        }
    }

    return text;
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

const drivers: ReadonlyArray<TransformerDriver> = [
    primaryHeaderDriver,
    primaryTodoDriver,
    doneTodoDriver,
    openTodoDriver,
    listItemDriver, // Keep behind todo drivers
    flagDriver,
    urlDriver,
    inlineCodeDriver,
    horizontalRuleDriver,
    emptyLineDriver,
    fallbackDriver, // Keep this last
];

export function transformToHtml(
    text: string,
    currentLineIndex: number | null,
): string {
    const lines = text.split('\n');

    return lines
        .map((line, index) => {
            return drivers.reduce((currentLine, driver) => {
                const transformedLine = driver(
                    currentLine,
                    index,
                    currentLineIndex,
                );

                return transformedLine;
            }, line);
        })
        .join('');
}
