import { type CSSProperties, type FC } from 'react';
import EditorSidebar from './components/editorSidebar/EditorSidebar';
import EditorTextarea from './components/editorTextarea/EditorTextarea';
import { Help } from './components/help/Help';
import { Share } from './components/share/Share';
import { useSetTitle } from './hooks/useSetTitle';

export type SharedStyle = Required<
    Pick<CSSProperties, 'fontFamily' | 'lineHeight' | 'fontSize' | 'overflowY'>
>;

const sharedStyle: SharedStyle = {
    fontFamily: 'Menlo',
    lineHeight: '24px',
    fontSize: '13px',
    overflowY: 'auto',
};

const Editor: FC = () => {
    useSetTitle();

    return (
        <div className="flex gap-4 flex-row max-w-4xl margin-x-auto relative">
            <div className="fixed bottom-0 left-0 z-40">
                <Help />
            </div>
            <div className="fixed bottom-0 right-0 z-40">
                <Share />
            </div>
            <EditorSidebar
                className="bg-amber-400 p-5 w-1/4"
                sharedStyle={sharedStyle}
            />
            <EditorTextarea sharedStyle={sharedStyle} />
        </div>
    );
};

export default Editor;
