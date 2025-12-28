import { type FC, type ReactNode, useState } from 'react';
import { EditorContext, type EditorContextValue } from './editorContext';
import { usePersistStateToUrl } from './hooks/usePersistStateToUrl';
import { decodeBase64 } from './utilities/base64utilities';

function loadTextFromQueryParam(): string {
    const queryParams = new URLSearchParams(window.location.search);

    try {
        const queryParamValue = queryParams.get('text');

        return queryParamValue ? decodeBase64(queryParamValue) : '';
    } catch (error) {
        // eslint-disable-next-line no-console
        console.warn(error);

        return '';
    }
}

export const EditorContextProvider: FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [text, setText] = useState<string>(loadTextFromQueryParam);

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

    usePersistStateToUrl(text);

    return (
        <EditorContext.Provider
            value={{ text, setText, appendToLine, replaceLine }}
        >
            {children}
        </EditorContext.Provider>
    );
};
