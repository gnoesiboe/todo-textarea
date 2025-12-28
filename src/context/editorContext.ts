import { createContext } from 'react';

export type EditorContextState = {
    text: string;
    currentLineIndex: number | null;
};

export type EditorContextValue = EditorContextState & {
    setText: (text: string) => void;
    appendToLine(index: number, textToAppend: string): void;
    replaceLine(index: number, newLine: string): void;
    setCurrentLineIndex(index: number | null): void;
};

export const EditorContext = createContext<EditorContextValue>({
    text: '',
    currentLineIndex: null,
    setText: () => {},
    appendToLine: () => {},
    replaceLine: () => {},
    setCurrentLineIndex: () => {},
});
