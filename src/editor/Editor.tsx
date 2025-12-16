import { type CSSProperties, type FC, useEffect, useState } from 'react';
import { getEditorText, storeEditorText } from '../storage/editorStateStorage';
import EditorSidebar from './components/editorSidebar/EditorSidebar';
import EditorTextarea from './components/editorTextarea/EditorTextarea';

const sharedStyle: CSSProperties = {
    fontFamily:
        '"SF Mono", SFMono-Regular, Menlo, Monaco, "Cascadia Code", Consolas, "Roboto Mono", "Noto Sans Mono", "Droid Sans Mono", "Ubuntu Mono", "DejaVu Sans Mono", "Liberation Mono", "Courier New", Courier, monospace',
    lineHeight: '24px',
    fontSize: '13px',
};

const Editor: FC = () => {
    const [text, setText] = useState<string>(getEditorText);

    useEffect(() => {
        storeEditorText(text);
    }, [text]);

    return (
        <div className="flex gap-4 flex-row max-w-4xl margin-x-auto">
            <EditorSidebar
                className="bg-amber-400 p-5 w-1/4 text-right"
                style={sharedStyle}
                text={text}
            />
            <EditorTextarea
                text={text}
                onChange={(value: string) => {
                    setText(value);
                }}
                sharedStyle={sharedStyle}
            />
        </div>
    );
};

export default Editor;
