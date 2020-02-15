import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'offreExperiencePipe'
})
export class OffreExperiencePipePipe implements PipeTransform {

  transform(items: any[], value: string): any[] {
    if (!items) {
        return [];
    }
    if (!value) {
        return items;
    }
    return items.filter(it => {
        const niveauExperience = it.niveauExperience.toString().toLowerCase().includes(value.toLowerCase());
        return (niveauExperience);
    });
}
}
