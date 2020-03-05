import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterAjoutEmployeur'
})
export class FilterAjoutEmployeurPipe implements PipeTransform {

  transform(items: any[], value: any): any {
    if (!items) {
      return [];
    }
    if (!value) {
      return items;
    }
    return items.filter(it => {
      const dateAjoutTest = it.dateAjout.toString().toLowerCase().includes(value.toLowerCase());
      return (dateAjoutTest);
    });
  }

}
