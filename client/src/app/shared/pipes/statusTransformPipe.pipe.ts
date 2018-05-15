import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'statusTransform' })
export class StatusTransformPipe implements PipeTransform {
    transform(value: Boolean): any {
        return value ? 'Active' : 'Inactive';
    }
}
