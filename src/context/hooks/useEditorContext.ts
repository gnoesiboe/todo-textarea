import { useContext } from 'react';
import { EditorContext } from '../editorContext';

export default function useEditorContext() {
    return useContext(EditorContext);
}
