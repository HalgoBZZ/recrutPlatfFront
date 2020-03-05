import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterDiplomeCandidat'
})
export class FilterDiplomeCandidatPipe implements PipeTransform {

  transform(items: any[], value: any): any {
    if (!items) {
      return [];
    }
    if (!value) {
      return items;
    }
    return items.filter(it => {
      const result = it.diplome.toString().toLowerCase().includes(value.toLowerCase());
      return (result);
    });
  }

}
