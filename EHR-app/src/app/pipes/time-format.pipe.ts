import { Pipe, PipeTransform } from '@angular/core';
import { Time } from '@angular/common';

@Pipe({
  name: 'timeFormat',
  standalone: true
})
export class TimeFormatPipe implements PipeTransform {
  transform(value: any): string {
    if (!value) return '';
    
    // Handle string format (HH:mm:ss)
    if (typeof value === 'string') {
      const timeParts = value.split(':');
      return `${timeParts[0]}:${timeParts[1]}`;
    }
    
    // Handle Time object
    if (value.hours !== undefined && value.minutes !== undefined) {
      const hours = value.hours.toString().padStart(2, '0');
      const minutes = value.minutes.toString().padStart(2, '0');
      return `${hours}:${minutes}`;
    }
    
    return '';
  }
}