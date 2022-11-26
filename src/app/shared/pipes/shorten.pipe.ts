import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shorten'
})
export class ShortenPipe implements PipeTransform {
  /**
   * @param  {string} value
   * @returns string
   * Slice input to char "-" and return it.
   */
  public transform(value: string): string {
    return value.slice(0, value.indexOf("-"));
  }

}
