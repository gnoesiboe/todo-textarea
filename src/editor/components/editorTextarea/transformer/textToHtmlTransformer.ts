type TransformerDriver = (text: string) => string;

const primaryHeaderDriver: TransformerDriver = (text) => {
    if (!text.startsWith('# ')) {
        return text;
    }

    return `<h1 class="text-black border-b-1 border-slate-400 font-bold bg-slate-100">${text}</h1>`;
};

const secondaryHeaderDriver: TransformerDriver = (text) => {
    if (!text.startsWith('## ')) {
        return text;
    }

    return `<h2 class="text-slate-800 font-bold">${text}</h2>`;
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
            '<a href="$1" class="text-blue-600 underline" target="_blank" rel="noopener noreferrer">$1</a>',
        );
    }

    return text;
};

const openTodoDriver: TransformerDriver = (text) => {
    if (text.startsWith('- [ ] ')) {
        const content = text.slice(6).trim();

        return `<div><span class="text-slate-300">- [ ]</span> <span class="text-slate-700">${content}</span></div>`;
    }

    return text;
};

const doneTodoDriver: TransformerDriver = (text) => {
    if (text.startsWith('- [x] ')) {
        const content = text.slice(6).trim();

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

const strongDriver: TransformerDriver = (text) => {
    if (/\*\*[^*]+\*\*/.test(text)) {
        return text.replaceAll(
            /\*\*([^*]+)\*\*/g,
            '<strong class="font-bold">**$1**</strong>',
        );
    }

    return text;
};

const horizontalRuleDriver: TransformerDriver = (text) => {
    if (/^---+$/.test(text.trim())) {
        return `<div class="border-b-1 border-slate-300">${'&nbsp;'.repeat(
            text.length,
        )}</div>`;
    }

    return text;
};

const fallbackDriver: TransformerDriver = (text) => {
    return `<p class="text-slate-600">${text}</p>`;
};

const flagDriver: TransformerDriver = (text) => {
    const flagRegex1 = /(@[a-z0-9-]+\([^)]*\))/gi;
    const flagRegex2 = /(@[a-z0-9-]+)/gi;

    const className = 'text-orange-200 italic';

    return text
        .replaceAll(flagRegex1, `<span class="${className}">$1</span>`)
        .replaceAll(flagRegex2, `<span class="${className}">$1</span>`);
};

const drivers: ReadonlyArray<TransformerDriver> = [
    primaryHeaderDriver,
    secondaryHeaderDriver,
    doneTodoDriver,
    openTodoDriver,
    listItemDriver, // Keep behind todo drivers
    strongDriver,
    flagDriver,
    urlDriver,
    horizontalRuleDriver,
    emptyLineDriver,
    fallbackDriver,
];

export function transformToHtml(text: string): string {
    const lines = text.split('\n');

    return lines
        .map((line) => {
            return drivers.reduce(
                (currentLine, driver) => driver(currentLine),
                line,
            );
        })
        .join('');
}
