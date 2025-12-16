import { createContext } from 'react';

export type EditorContextValue = {
    text: string;
    setText: (text: string) => void;
    appendToLine(index: number, textToAppend: string): void;
    replaceLine(index: number, newLine: string): void;
};

export const EditorContext = createContext<EditorContextValue>({
    text: '',
    setText: () => {},
    appendToLine: () => {},
    replaceLine: () => {},
});
