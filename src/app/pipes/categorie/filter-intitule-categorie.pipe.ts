import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterIntituleCategorie'
})
export class FilterIntituleCategoriePipe implements PipeTransform {

  transform(items: any[], value: any): any {
    if (!items) {
      return [];
    }
    if (!value) {
      return items;
    }
    return items.filter(it => {
      const inituleTest = it.intitule.toString().toLowerCase().includes(value.toLowerCase());
      return (inituleTest);
    });
  }

}
