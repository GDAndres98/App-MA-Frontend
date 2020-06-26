import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stringShorter'
})
export class StringShorter implements PipeTransform {
  transform(value: string, limit: number = 60): string {
      if(value.length > limit)
        return value.slice(0,limit) + "...";
      return value;
  }
}