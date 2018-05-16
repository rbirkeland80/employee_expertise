import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'permissionNameTransform' })
export class PermissionNameTransformPipe implements PipeTransform {
    transform(value: String): any {
        if (!value) {
            return value;
        }

        let newValue = '';
        let i = 0;

        while (i < 4) {
            if (value[i] === value[i].toUpperCase()) {
                newValue += i === 0 ? '' : ' ';

                break;
            }

            newValue += i === 0 ? '' : '/';
            newValue += replaceWithFullWord(value[i]);
            newValue += i === 3 ? ' ' : '';

            i++;
        }

        newValue += value.slice(i);

        return newValue;
    }
}

function replaceWithFullWord (char) {
    switch (char) {
        case 'c':
            return 'Create';
        case 'd':
            return 'Delete';
        case 'r':
            return 'Read';
        case 'u':
            return 'Update';
        default:
            return char;
    }
}
