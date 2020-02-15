import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'offreSalairePipe'
})
export class OffreSalairePipePipe implements PipeTransform {

  transform(items: any[], value: string): any[] {
    if (!items) {
        return [];
    }
    if (!value) {
        return items;
    }
    return items.filter(it => {
        const salaire = it.salaire.toString().toLowerCase().includes(value.toLowerCase());
        return (salaire);
    });

}}
