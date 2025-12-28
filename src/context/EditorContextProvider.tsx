import { type FC, type ReactNode, useState } from 'react';
import {
    EditorContext,
    type EditorContextState,
    type EditorContextValue,
} from './editorContext';
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
    const [state, setState] = useState<EditorContextState>(() => {
        return {
            text: loadTextFromQueryParam(),
            currentLineIndex: null,
        };
    });

    const appendToLine: EditorContextValue['appendToLine'] = (
        index,
        textToAppend,
    ) => {
        setState((currentState) => {
            const newText = currentState.text
                .split('\n')
                .map((line, lineIndex) => {
                    if (lineIndex === index) {
                        return line.trim() + textToAppend;
                    }

                    return line;
                })
                .join('\n');

            return { ...currentState, text: newText };
        });
    };

    const replaceLine: EditorContextValue['replaceLine'] = (index, newLine) => {
        setState((currentState) => {
            const newText = currentState.text
                .split('\n')
                .map((line, lineIndex) => {
                    if (lineIndex === index) {
                        return newLine;
                    }

                    return line;
                })
                .join('\n');

            return { ...currentState, text: newText };
        });
    };

    const setCurrentLineIndex: EditorContextValue['setCurrentLineIndex'] = (
        index,
    ) => {
        setState((currentState) => ({
            ...currentState,
            currentLineIndex: index,
        }));
    };

    const setText: EditorContextValue['setText'] = (text) => {
        setState((currentState) => ({
            ...currentState,
            text,
        }));
    };

    usePersistStateToUrl(state.text);

    return (
        <EditorContext.Provider
            value={{
                ...state,
                setText,
                appendToLine,
                replaceLine,
                setCurrentLineIndex,
            }}
        >
            {children}
        </EditorContext.Provider>
    );
};
