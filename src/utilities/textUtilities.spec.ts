import { describe, expect, test } from 'vitest';
import { splitSeparateSections } from './textUtilities';

describe('split separate sections', () => {
    test('when provided with text, it splits it into the correct sections', () => {
        const text = 'a\nb\n\n\nc\n\n\nd';

        const result = splitSeparateSections(text);

        expect(result).toEqual(['a\nb\n\n\n', 'c\n\n\n', 'd']);
    });
});
