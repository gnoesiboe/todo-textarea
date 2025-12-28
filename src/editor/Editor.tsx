import { type CSSProperties, type FC } from 'react';
import EditorSidebar from './components/editorSidebar/EditorSidebar';
import EditorTextarea from './components/editorTextarea/EditorTextarea';

export type SharedStyle = NonNullable<
    Pick<CSSProperties, 'fontFamily' | 'lineHeight' | 'fontSize' | 'overflowY'>
>;

const sharedStyle: SharedStyle = {
    fontFamily: 'Menlo',
    lineHeight: '24px',
    fontSize: '13px',
    overflowY: 'auto',
};

const Editor: FC = () => {
    return (
        <div className="flex gap-4 flex-row max-w-4xl margin-x-auto h-full">
            <EditorSidebar
                className="bg-amber-400 p-5 w-1/4"
                sharedStyle={sharedStyle}
            />
            <EditorTextarea sharedStyle={sharedStyle} />
        </div>
    );
};

export default Editor;
