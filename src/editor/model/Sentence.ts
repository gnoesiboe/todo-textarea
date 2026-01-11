export class Sentence {
    public readonly text: string;
    public isTodo: boolean;

    public constructor(text: string, isTodo: boolean) {
        this.text = text;
        this.isTodo = isTodo;
    }

    public clearTodoSatus(): void {
        this.isTodo = false;
    }

    public getLines(numberOfCharsPerLine: number): string[] {
        if (this.text.length <= numberOfCharsPerLine) {
            return [this.text];
        }

        const words = this.text.split(/[- ]+/);
        const out: string[] = [''];

        words.forEach((word) => {
            const lastSubLineIndex = out.length - 1;
            const lastSubLine = out[lastSubLineIndex];

            const fitsOnSameLine =
                lastSubLine.length +
                    (lastSubLine.length > 0 ? 1 : 0) +
                    word.length <=
                numberOfCharsPerLine;

            if (fitsOnSameLine) {
                out[lastSubLineIndex] =
                    lastSubLine + (lastSubLine.length > 0 ? ' ' : '') + word;
            } else {
                out.push(word);
            }
        });

        return out;
    }
}
