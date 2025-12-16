import { createContext } from 'react';

type EditorContextValue = {
    text: string;
    setText: (text: string) => void;
};

export const EditorContext = createContext<EditorContextValue>({
    text: '',
    setText: () => {},
});
