import { RichTableGenericPipe } from './richTableGenericPipe.pipe';

describe('richTableGenericPipe', () => {
    const pipe = new RichTableGenericPipe();

    it('transforms return value as is', () => {
        expect(pipe.transform('abc def')).toBe('abc def');
    });

    it('transforms "abc" to "Abc"', () => {
        const args = [
            function (value) {
                return value.toUpperCase();
            }
        ];

        expect(pipe.transform('abc', args)).toBe('ABC');
    });

    it('transforms "abc" to "AB test"', () => {
        const args = [
            function (value) {
                return value.toUpperCase();
            },
            function (value) {
                return value.replace('C', ' test');
            }
        ];

        expect(pipe.transform('abc', args)).toBe('AB test');
    });
});
