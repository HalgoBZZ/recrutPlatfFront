import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'offreLanguePipe'
})
export class OffreLanguePipePipe implements PipeTransform {

  transform(items: any[], value: string): any[] {
    if (!items) {
        return [];
    }
    if (!value) {
        return items;
    }
    return items.filter(it => {
        const langues = it.langues.toString().toLowerCase().includes(value.toLowerCase());
        return (langues);
    });

}}
