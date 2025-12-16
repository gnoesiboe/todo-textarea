import { type FC, type ReactNode, useEffect, useState } from 'react';
import { getEditorText, storeEditorText } from '../storage/editorStateStorage';
import { EditorContext, type EditorContextValue } from './editorContext';

export const EditorContextProvider: FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [text, setText] = useState<string>(getEditorText);

    const appendToLine: EditorContextValue['appendToLine'] = (
        index,
        textToAppend,
    ) => {
        setText((currentText) => {
            return currentText
                .split('\n')
                .map((line, lineIndex) => {
                    if (lineIndex === index) {
                        return line.trim() + textToAppend;
                    }

                    return line;
                })
                .join('\n');
        });
    };

    const replaceLine: EditorContextValue['replaceLine'] = (index, newLine) => {
        setText((currentText) => {
            return currentText
                .split('\n')
                .map((line, lineIndex) => {
                    if (lineIndex === index) {
                        return newLine;
                    }

                    return line;
                })
                .join('\n');
        });
    };

    useEffect(() => storeEditorText(text), [text]);

    return (
        <EditorContext.Provider
            value={{ text, setText, appendToLine, replaceLine }}
        >
            {children}
        </EditorContext.Provider>
    );
};
