import { type FC, type ReactNode, useEffect, useState } from 'react';
import { getEditorText, storeEditorText } from '../storage/editorStateStorage';
import { EditorContext } from './editorContext';

export const EditorContextProvider: FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [text, setText] = useState<string>(getEditorText);

    useEffect(() => storeEditorText(text), [text]);

    return (
        <EditorContext.Provider value={{ text, setText }}>
            {children}
        </EditorContext.Provider>
    );
};
