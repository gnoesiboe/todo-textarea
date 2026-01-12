import { describe, it, expect } from 'vitest';
import { encodeBase64, decodeBase64 } from './base64utilities';

describe('base64utilities', () => {
    describe('encodeBase64', () => {
        it('should encode simple ASCII text', () => {
            const input = 'Hello, World!';
            const encoded = encodeBase64(input);
            expect(encoded).toBe('SGVsbG8sIFdvcmxkIQ==');
        });

        it('should encode empty string', () => {
            const input = '';
            const encoded = encodeBase64(input);
            expect(encoded).toBe('');
        });

        it('should encode Unicode characters', () => {
            const input = 'Hello 👋 World 🌍';
            const encoded = encodeBase64(input);
            expect(encoded).toBeTruthy();
            expect(typeof encoded).toBe('string');
        });

        it('should encode special characters', () => {
            const input = '!@#$%^&*()_+-=[]{}|;:,.<>?';
            const encoded = encodeBase64(input);
            expect(encoded).toBeTruthy();
            expect(typeof encoded).toBe('string');
        });

        it('should encode multiline text', () => {
            const input = 'Line 1\nLine 2\nLine 3';
            const encoded = encodeBase64(input);
            expect(encoded).toBeTruthy();
            expect(typeof encoded).toBe('string');
        });

        it('should encode text with various Unicode characters', () => {
            const input = 'Café, naïve, 日本語, 한글, 中文';
            const encoded = encodeBase64(input);
            expect(encoded).toBeTruthy();
            expect(typeof encoded).toBe('string');
        });
    });

    describe('decodeBase64', () => {
        it('should decode simple ASCII text', () => {
            const encoded = 'SGVsbG8sIFdvcmxkIQ==';
            const decoded = decodeBase64(encoded);
            expect(decoded).toBe('Hello, World!');
        });

        it('should decode empty string', () => {
            const encoded = '';
            const decoded = decodeBase64(encoded);
            expect(decoded).toBe('');
        });

        it('should decode Unicode characters', () => {
            const original = 'Hello 👋 World 🌍';
            const encoded = encodeBase64(original);
            const decoded = decodeBase64(encoded);
            expect(decoded).toBe(original);
        });

        it('should decode special characters', () => {
            const original = '!@#$%^&*()_+-=[]{}|;:,.<>?';
            const encoded = encodeBase64(original);
            const decoded = decodeBase64(encoded);
            expect(decoded).toBe(original);
        });

        it('should decode multiline text', () => {
            const original = 'Line 1\nLine 2\nLine 3';
            const encoded = encodeBase64(original);
            const decoded = decodeBase64(encoded);
            expect(decoded).toBe(original);
        });

        it('should decode text with various Unicode characters', () => {
            const original = 'Café, naïve, 日本語, 한글, 中文';
            const encoded = encodeBase64(original);
            const decoded = decodeBase64(encoded);
            expect(decoded).toBe(original);
        });
    });

    describe('encodeBase64 and decodeBase64 round-trip', () => {
        it('should correctly encode and decode simple text', () => {
            const original = 'Hello, World!';
            const encoded = encodeBase64(original);
            const decoded = decodeBase64(encoded);
            expect(decoded).toBe(original);
        });

        it('should correctly encode and decode with emojis', () => {
            const original = '🎉 Party time! 🎊';
            const encoded = encodeBase64(original);
            const decoded = decodeBase64(encoded);
            expect(decoded).toBe(original);
        });

        it('should correctly encode and decode long text', () => {
            const original = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. '.repeat(10);
            const encoded = encodeBase64(original);
            const decoded = decodeBase64(encoded);
            expect(decoded).toBe(original);
        });

        it('should correctly encode and decode JSON string', () => {
            const original = JSON.stringify({ name: 'John', age: 30, emoji: '😀' });
            const encoded = encodeBase64(original);
            const decoded = decodeBase64(encoded);
            expect(decoded).toBe(original);
        });

        it('should correctly encode and decode text with tabs and newlines', () => {
            const original = 'First line\n\tIndented line\n\t\tDouble indented';
            const encoded = encodeBase64(original);
            const decoded = decodeBase64(encoded);
            expect(decoded).toBe(original);
        });
    });
});
