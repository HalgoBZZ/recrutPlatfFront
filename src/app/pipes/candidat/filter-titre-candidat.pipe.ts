import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterTitreCandidat'
})
export class FilterTitreCandidatPipe implements PipeTransform {

  transform(items: any[], value: any): any {
    if (!items) {
      return [];
    }
    if (!value) {
      return items;
    }
    return items.filter(it => {
      const result = it.titre.toString().toLowerCase().includes(value.toLowerCase());
      return (result);
    });
  }

}
