import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'offreCompetencePipe'
})
export class OffreCompetencePipePipe implements PipeTransform {
  transform(items: any[], value: string): any[] {
    if (!items) {
        return [];
    }
    if (!value) {
        return items;
    }
    return items.filter(it => {
        const competences = it.competences.toString().toLowerCase().includes(value.toLowerCase());
        return (competences);
    });
}
}
