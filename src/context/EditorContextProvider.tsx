import { type FC, type ReactNode, useState } from 'react';
import {
    EditorContext,
    type EditorContextState,
    type EditorContextValue,
} from './editorContext';
import { usePersistStateToUrl } from './hooks/usePersistStateToUrl';
import { decodeBase64 } from './utilities/base64utilities';
import { isDoneRegex } from '../editor/components/editorTextarea/transformer/textToHtmlTransformer';
import { formatAsDateTime } from '../utilities/dateTimeUtilities';

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

    const toggleLineDoneStatus: EditorContextValue['toggleLineDoneStatus'] = (
        lineIndex: number,
    ): void => {
        const newText = state.text
            .split('\n')
            .map((line, index) => {
                if (lineIndex !== index) {
                    return line;
                }

                if (isDoneRegex.test(line)) {
                    return line.replace(/@done\([^)]*\)/g, '');
                }

                return `${line.trim()} @done(${formatAsDateTime(new Date())})`;
            })
            .join('\n');

        setText(newText);
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
                toggleLineDoneStatus,
            }}
        >
            {children}
        </EditorContext.Provider>
    );
};
