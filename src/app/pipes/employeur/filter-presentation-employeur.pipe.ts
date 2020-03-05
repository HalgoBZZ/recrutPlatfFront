import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterPresentationEmployeur'
})
export class FilterPresentationEmployeurPipe implements PipeTransform {

  transform(items: any[], value: any): any {
    if (!items) {
      return [];
    }
    if (!value) {
      return items;
    }
    return items.filter(it => {
      const presentationTest = it.presentation.toString().toLowerCase().includes(value.toLowerCase());
      return (presentationTest);
    });
  }
}
