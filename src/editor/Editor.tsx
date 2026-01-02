import { type CSSProperties, type FC } from 'react';
import EditorSidebar from './components/editorSidebar/EditorSidebar';
import EditorTextarea from './components/editorTextarea/EditorTextarea';
import { Help } from './components/help/Help';
import { Share } from './components/share/Share';
import { Title } from './components/title/Title';

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
    return (
        <div className="max-w-4xl margin-x-auto relative">
            <div className="fixed bottom-0 left-0 z-40">
                <Help />
            </div>
            <div className="fixed bottom-0 right-0 z-40">
                <Share />
            </div>
            <Title />
            <div className="flex gap-4 flex-row">
                <EditorSidebar
                    className="bg-stone-300 p-5 w-1/4"
                    sharedStyle={sharedStyle}
                />
                <EditorTextarea sharedStyle={sharedStyle} />
            </div>
        </div>
    );
};

export default Editor;
