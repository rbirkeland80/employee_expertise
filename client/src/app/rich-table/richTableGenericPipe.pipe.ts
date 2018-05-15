import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'richTableGenericPipe' })
export class RichTableGenericPipe implements PipeTransform {
    transform(value: string, args?: Function | Function[]): any {
        if (!value || !args) {
            return value;
        }

        if (typeof args === 'function') {
            value = args(value, args);
        } else {
            args.forEach((pipe) => {
                value = pipe(value, args);
            });
        }

        return value;
    }
}
