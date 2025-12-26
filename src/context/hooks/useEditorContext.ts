import { useContext } from 'react';
import { EditorContext, type EditorContextValue } from '../editorContext';

export default function useEditorContext(): EditorContextValue {
    return useContext(EditorContext);
}
