import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterDatenaissanceCandidat'
})
export class FilterDatenaissanceCandidatPipe implements PipeTransform {

  transform(items: any[], value: any): any {
    if (!items) {
      return [];
    }
    if (!value) {
      return items;
    }
    return items.filter(it => {
      const result = it.dateNaissance.toString().toLowerCase().includes(value.toLowerCase());
      return (result);
    });
  }

}
