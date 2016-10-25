/**
 * Created by Fabian on 25/10/2016.
 */

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'defaultValue'})
export class DefaultValuePipe implements PipeTransform {
    transform(value: string, defaultValue: string): string {
        if(value) return value;
        return defaultValue
    }
}