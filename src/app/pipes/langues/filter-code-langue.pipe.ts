import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterCodeLangue'
})
export class FilterCodeLanguePipe implements PipeTransform {

  transform(items: any[], value: any): any {
    if (!items) {
      return [];
    }
    if (!value) {
      return items;
    }
    return items.filter(it => {
      const codeTest = it.code.toString().toLowerCase().includes(value.toLowerCase());
      return (codeTest);
    });
  }

}
