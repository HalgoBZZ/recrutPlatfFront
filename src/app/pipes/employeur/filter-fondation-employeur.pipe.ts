import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterFondationEmployeur'
})
export class FilterFondationEmployeurPipe implements PipeTransform {

  transform(items: any[], value: any): any {
    if (!items) {
      return [];
    }
    if (!value) {
      return items;
    }
    return items.filter(it => {
      const fondationTest = it.fondation.toString().toLowerCase().includes(value.toLowerCase());
      return (fondationTest);
    });
  }

}
