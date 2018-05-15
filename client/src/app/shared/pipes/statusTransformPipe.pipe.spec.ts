import { StatusTransformPipe } from './statusTransformPipe.pipe';

describe('statusTransformPipe', () => {
    const pipe = new StatusTransformPipe();

    it('transforms true to "Active"', () => {
        expect(pipe.transform(true)).toBe('Active');
    });

    it('transforms false to "Inactive"', () => {
        expect(pipe.transform(false)).toBe('Inactive');
    });

    it('transforms null to "Inactive"', () => {
        expect(pipe.transform(null)).toBe('Inactive');
    });

    it('transforms undefined to "Inactive"', () => {
        expect(pipe.transform(undefined)).toBe('Inactive');
    });
});
