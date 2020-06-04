import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterLibelleLangue'
})
export class FilterLibelleLanguePipe implements PipeTransform {

  transform(items: any[], value: any): any {
    if (!items) {
      return [];
    }
    if (!value) {
      return items;
    }
    return items.filter(it => {
      const libelleTest = it.libelle.toString().toLowerCase().includes(value.toLowerCase());
      return (libelleTest);
    });
  }

}
