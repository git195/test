import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'split'
})
export class SplitPipe implements PipeTransform {

  constructor() { }
  transform(input: any, separator: string = ' '): any {
 
    let output = input.split(separator);
    return output[0];
  }

}
