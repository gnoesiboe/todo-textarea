export function encodeBase64(text: string): string {
    return btoa(text);
}

export function decodeBase64(encodedText: string): string {
    return atob(encodedText);
}
