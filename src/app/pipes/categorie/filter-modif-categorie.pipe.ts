import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterModifCategorie'
})
export class FilterModifCategoriePipe implements PipeTransform {

  transform(items: any[], value: any): any {
    if (!items) {
      return [];
    }
    if (!value) {
      return items;
    }
    return items.filter(it => {
      const dateModifTest = it.dateModif.toString().toLowerCase().includes(value.toLowerCase());
      return (dateModifTest);
    });
  }

}
