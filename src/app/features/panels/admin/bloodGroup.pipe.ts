import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'bloodGroup',
  standalone: true,
})
export class BloodGroupPipe implements PipeTransform {

  transform(value: string): string {
    return value ? value : '-';
  }

}

