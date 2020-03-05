import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterEmailCandidat'
})
export class FilterEmailCandidatPipe implements PipeTransform {

  transform(items: any[], value: any): any {
    if (!items) {
      return [];
    }
    if (!value) {
      return items;
    }
    return items.filter(it => {
      const result = it.email.toString().toLowerCase().includes(value.toLowerCase());
      return (result);
    });
  }

}
