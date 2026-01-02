import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import Editor from './editor/Editor';
import { EditorContextProvider } from './context/EditorContextProvider';
import { ToastContainer } from 'react-toastify';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <EditorContextProvider>
            <Editor />
        </EditorContextProvider>
        <ToastContainer />
    </StrictMode>,
);
