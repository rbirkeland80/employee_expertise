import { PermissionNameTransformPipe } from './permissionNameTransformPipe.pipe';

describe('statusTransformPipe', () => {
    const pipe = new PermissionNameTransformPipe();

    it('transforms "rEmployee" to "Read Employee"', () => {
        expect(pipe.transform('rEmployee')).toBe('Read Employee');
    });

    it('does not transform "Employee"', () => {
        expect(pipe.transform('Employee')).toBe('Employee');
    });

    it('transforms "rucdLevel" to "Read/Update/Create/Delete Level"', () => {
        expect(pipe.transform('rucdLevel')).toBe('Read/Update/Create/Delete Level');
    });

    it('transforms "rucddLevel" to "Read/Update/Create/Delete dLevel"', () => {
        expect(pipe.transform('rucddLevel')).toBe('Read/Update/Create/Delete dLevel');
    });

    it('transforms "uGrucd" to "Update Grucd"', () => {
        expect(pipe.transform('uGrucd')).toBe('Update Grucd');
    });
});
