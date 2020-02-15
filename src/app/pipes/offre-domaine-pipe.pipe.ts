import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'offreDomainePipe'
})
export class OffreDomainePipePipe implements PipeTransform {

  transform(items: any[], value: string): any[] {
    if (!items) {
        return [];
    }
    if (!value) {
        return items;
    }
    return items.filter(it => {
        const domaine = it.domaine.toString().toLowerCase().includes(value.toLowerCase());
        return (domaine);
    });

}
}