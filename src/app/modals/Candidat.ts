import { Utilisateur } from './Utilisateur';

export class Candidat extends Utilisateur {
    nom;
    prenom;
    photoPath;
    photo = File;

    dateNaissance;
    diplome;
    piece_jointePath;
    piece_jointe = File;
    tel;
    titre;
    adresse;
    nationalite;
    formations;
    competences;
    experiences; 
    langues;
    offres;
}