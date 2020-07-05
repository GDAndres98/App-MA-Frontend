import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
    name: 'round'
})
export class RoundFormat implements PipeTransform {

    transform(value: number): string {

        return Math.round(value)+"";
    }

}