import { Poste } from './Poste';

export class Offre {
    id;
    niveauEtude;
    fonction;
    horaire;
    salaire;
    niveauExperience;
    dateAjout;
    dateModif;
    domaine;
    competences;
    poste: Poste;
    employeur: any;
    constructor() {
      this.poste = new Poste();
      this.niveauEtude = 0;
      this.niveauExperience = 0;
      this.salaire = 0;
      this.horaire = 0;
    }
}
