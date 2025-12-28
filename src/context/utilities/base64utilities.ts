export function encodeBase64(text: string): string {
    const bytes = new TextEncoder().encode(text);

    const binaryString = Array.from(bytes, (byte) =>
        String.fromCodePoint(byte),
    ).join('');

    return btoa(binaryString);
}

export function decodeBase64(encodedText: string): string {
    const binString = atob(encodedText);

    const bytes = Uint8Array.from(binString, (m) => m.codePointAt(0) as number);

    return new TextDecoder().decode(bytes);
}
