import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'firstLetter',
  standalone: true
})
export class FirstLetterPipe implements PipeTransform {
  /**
   * Pipe to show first letter of string, when there is no photo of user
   * @param value :string -- name of user
   */
  transform(value: string): string {
    return value.charAt(0).toUpperCase();
  }
}
