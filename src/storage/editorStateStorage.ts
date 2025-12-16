const STORAGE_KEY = 'editorState';

export function storeEditorText(text: string): void {
    localStorage.setItem(STORAGE_KEY, text);
}

export function getEditorText(): string {
    const text = localStorage.getItem(STORAGE_KEY);

    return text || '';
}
