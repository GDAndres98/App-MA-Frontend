import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
    name: 'milisecondsFormat'
})
export class MilisecondsFormat implements PipeTransform {

    transform(value: number, showDays: boolean = false, showSeconds: boolean = true): string {

        value /= 1000;
        const days: number = Math.floor(value / 60 / 60 / 24);
        const hours: number = Math.floor(value / 60 / 60) % 24;
        const minutes: number = Math.floor(value / 60) % 60;
        value = Math.floor(value) % 60;
        let result: string = "";
        if (days > 0) {
            if (showDays)
                result += days + " días "
            else
                result += days.toString() + ":";
        }
        if (hours > 0 || result.length > 0)
            result += hours.toString().padStart(2, '0') + ":";
        result += minutes.toString().padStart(2, '0');
        if (showSeconds)
            result += ":" + value.toString().padStart(2, '0');
        return result;
    }

}