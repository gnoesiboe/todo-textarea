import { type CSSProperties, type FC } from 'react';
import EditorSidebar from './components/editorSidebar/EditorSidebar';
import EditorTextarea from './components/editorTextarea/EditorTextarea';

export type SharedStyle = NonNullable<
    Pick<CSSProperties, 'fontFamily' | 'lineHeight' | 'fontSize'>
>;

const sharedStyle: SharedStyle = {
    fontFamily:
        // '"SF Mono", SFMono-Regular, Menlo, Monaco, "Cascadia Code", Consolas, "Roboto Mono", "Noto Sans Mono", "Droid Sans Mono", "Ubuntu Mono", "DejaVu Sans Mono", "Liberation Mono", "Courier New", Courier, monospace',
        'Menlo',
    lineHeight: '24px',
    fontSize: '13px',
};

const Editor: FC = () => {
    return (
        <div className="flex gap-4 flex-row max-w-4xl margin-x-auto">
            <EditorSidebar
                className="bg-amber-400 p-5 w-1/4"
                sharedStyle={sharedStyle}
            />
            <EditorTextarea sharedStyle={sharedStyle} />
        </div>
    );
};

export default Editor;
