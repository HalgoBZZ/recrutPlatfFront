import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterCategorieCompetence'
})
export class FilterCategorieCompetencePipe implements PipeTransform {

  transform(items: any[], value: any): any {
    if (!items) {
      return [];
    }
    if (!value) {
      return items;
    }
    return items.filter(it => {
      const catTest = it.domaine.intitule.toString().toLowerCase().includes(value.toLowerCase());
      return (catTest);
    });
  }

}
