import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'truncate'})
export class TruncateStringPipe implements PipeTransform{
  transform(text: string, length: number): string {
    if (text.length > length) {
      return text.substring(0, length) + '...';
    } else {
      return text;
    }
  }
}