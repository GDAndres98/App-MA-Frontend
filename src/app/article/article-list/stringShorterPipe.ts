import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stringShorter'
})
export class StringShorter implements PipeTransform {
  transform(value: string): string {
      if(value.length > 60)
        return value.slice(0,60) + "...";
      return value;
  }
}