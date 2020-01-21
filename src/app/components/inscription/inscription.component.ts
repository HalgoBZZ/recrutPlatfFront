import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employeur } from 'src/app/modals/Employeur.';
import { EmployeurService } from 'src/app/services/EmployeurService';
import { CandidatService } from 'src/app/services/CandidatService';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {
  cmptEmployeur = false;
  cmptCandidat = false;
  choose = false;
  paysList = ['Afrique du Sud', 'Afghanistan', 'Albanie', 'Algérie', 'Allemagne', 'Andorre', 'Angola',
    'Antigua-et-Barbuda', 'Arabie Saoudite', 'Argentine', 'Arménie', 'Australie', 'Autriche', 'Azerbaïdjan',
    'Bahamas', 'Bahreïn', 'Bangladesh', 'Barbade', 'Belgique', 'Belize', 'Bénin', 'Bhoutan', 'Biélorussie',
    'Birmanie', 'Bolivie', 'Bosnie-Herzégovine', 'Botswana', 'Brésil', 'Brunei', 'Bulgarie', 'Burkina Faso',
    'Burundi', 'Cambodge', 'Cameroun', 'Canada', 'Cap-Vert', 'Chili', 'Chine', 'Chypre', 'Colombie', 'Comores',
    'Corée du Nord', 'Corée du Sud', 'Costa Rica', 'Côte d’Ivoire', 'Croatie', 'Cuba', 'Danemark', 'Djibouti',
    'Dominique', 'Égypte', 'Émirats arabes unis', 'Équateur', 'Érythrée', 'Espagne', 'Eswatini', 'Estonie',
    'États-Unis', 'Éthiopie', 'Fidji', 'Finlande', 'France', 'Gabon	', 'Gambie', 'Géorgie', 'Ghana', 'Grèce',
    'Grenade', 'Guatemala', 'Guinée', 'Guinée équatoriale', 'Guinée-Bissau', 'Guyana', 'Haïti', 'Honduras', 'Hongrie',
    'Îles Cook', 'Îles Marshall',
    'Inde',
    'Indonésie',
    'Irak',
    'Iran',
    'Irlande',
    'Islande',
    'Italie,',
    'Jamaïque',
    'Japon',
    'Jordanie',
    'Kazakhstan',
    'Kenya',
    'Kirghizistan',
    'Kiribati',
    'Koweït',
    'Laos',
    'Lesotho',
    'Lettonie',
    'Liban',
    'Liberia',
    'Libye',
    'Liechtenstein',
    'Lituanie',
    'Luxembourg',
    'Macédoine',
    'Madagascar',
    'Malaisie',
    'Malawi',
    'Maldives',
    'Mali',
    'Malte',
    'Maroc',
    'Maurice',
    'Mauritanie',
    'Mexique',
    'Micronésie',
    'Moldavie',
    'Monaco',
    'Mongolie',
    'Monténégro',
    'Mozambique',
    'Namibie',
    'Nauru',
    'Népal',
    'Nicaragua',
    'Niger',
    'Nigeria',
    'Niue',
    'Norvège',
    'Nouvelle-Zélande',
    'Oman',
    'Ouganda',
    'Ouzbékistan',
    'Pakistan',
    'Palaos',
    'Palestine',
    'Panama',
    'Papouasie-Nouvelle-Guinée',
    'Paraguay',
    'Pays-Bas',
    'Pérou',
    'Philippines',
    'Pologne',
    'Portugal',
    'Qatar',
    'République centrafricaine',
    'République démocratique du Congo',
    'République Dominicaine',
    'République du Congo',
    'République tchèque',
    'Roumanie',
    'Royaume-Uni',
    'Russie',
    'Rwanda',
    'Saint-Kitts-et-Nevis',
    'Saint-Vincent-et-les-Grenadines',
    'Sainte-Lucie',
    'Saint-Marin',
    'Salomon',
    'Salvador',
    'Samoa',
    'São Tomé-et-Principe',
    'Sénégal',
    'Serbie',
    'Seychelles',
    'Sierra Leone',
    'Singapour',
    'Slovaquie',
    'Slovénie',
    'Somalie',
    'Soudan',
    'Soudan du Sud',
    'Sri Lanka',
    'Suède',
    'Suisse',
    'Suriname',
    'Syrie',
    'Tadjikistan',
    'Tanzanie',
    'Tchad',
    'Thaïlande',
    'Timor oriental',
    'Togo',
    'Tonga',
    'Trinité-et-Tobago',
    'Tunisie',
    'Turkménistan',
    'Turquie',
    'Tuvalu',
    'Ukraine',
    'Uruguay',
    'Vanuatu',
    'Vatican',
    'Venezuela',
    'Viêt Nam',
    'Yémen',
    'Zambie	',
    'Zimbabwe'];
  candidat: any;
  employeur = new Employeur();
  pwdConfirmation;
  employeInscrit: boolean;
  inscritError: boolean;
  pwdConfirm: boolean;
  constructor(private router: Router, private employeurService: EmployeurService, private candidatService: CandidatService) { }

  ngOnInit() {
  }

  chooseTypeCompte(entry) {
    if (entry === 'employeur') {
      this.cmptEmployeur = true;
      this.cmptCandidat = false;
      this.choose = true;
    }
    if (entry === 'candidat') {
      this.cmptCandidat = true;
      this.cmptEmployeur = false;
      this.choose = true;
    }
  }
  inscription() {
    console.log('** cmptCandidat ****', this.cmptCandidat)
    console.log('*** cmptEmployeur ***', this.cmptEmployeur)

    if (this.cmptCandidat) {
      if (this.pwdConfirm == this.candidat.password) {
        this.pwdConfirm = true;
        this.candidatService.inscription(this.candidat);
      }else{
        this.pwdConfirm = false;
      }

    } else if (this.cmptEmployeur) {
      console.log('***----***', this.employeur)
      if (this.pwdConfirm == this.employeur.password) {
        this.pwdConfirm = true;
        this.employeurService.inscription(this.employeur).subscribe(result => {
          this.employeInscrit = true;
        }, error => {
          this.employeInscrit = false;
          this.inscritError = true;
        });
      }else{
        this.pwdConfirm = false;
      }
    }
  }



  back() {
    if (!this.choose) {
      this.router.navigate(['/login']);
    } else {
      this.choose = false;
    }
  }

}
