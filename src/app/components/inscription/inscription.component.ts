import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employeur } from 'src/app/modals/Employeur.';
import { EmployeurService } from 'src/app/services/EmployeurService';
import { CandidatService } from 'src/app/services/CandidatService';
import { UtilisateurService } from 'src/app/services/UtilisateurService';
import { Candidat } from 'src/app/modals/Candidat';
import { ToastrService } from 'ngx-toastr';

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
  candidat = new Candidat();;
  employeur = new Employeur();
  pwdConfirmation;
  employeInscrit: boolean;
  inscritError: boolean;
  pwdConfirm;
  usedMail = false;
  constructor(private router: Router, private toastr: ToastrService, private utilisateurService: UtilisateurService, private employeurService: EmployeurService, private candidatService: CandidatService) { }

  ngOnInit() {
    this.pwdConfirmation=false;
    this.employeInscrit=false;

    this.inscritError=false;
    this.pwdConfirm;
    this.usedMail = false;
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

    if (this.cmptCandidat) {
      this.checkUsedMail();
      this.checkPwdConfirmation(this.candidat);
      console.log('this.usedMail ', this.usedMail)
      console.log('this.pwdConfirm ', this.pwdConfirm)

      if (!this.usedMail && this.pwdConfirm) {
        this.candidatService.inscription(this.candidat).subscribe(result => {
          if (result != null) {
            this.toastr.success('votre inscription a bien été enregistrée');
            setTimeout(() => {
              this.router.navigate(['/login']);
            }, 3000);
          }
        }, error => {
          this.employeInscrit = false;
          this.inscritError = true;
          this.toastr.error('Oops il y a une problème');
        });
      }
    } else if (this.cmptEmployeur) {
      this.checkUsedMail();
      this.checkPwdConfirmation(this.candidat);
      if ( ! this.usedMail && this.pwdConfirm) {
        this.employeurService.inscription(this.employeur).subscribe(result => {
          if (result != null) {
            this.toastr.success('votre inscription a bien été enregistrée');
            setTimeout(() => {
              this.router.navigate(['/login']);
            }, 2000);          }
        }, error => {
          this.employeInscrit = false;
          this.inscritError = true;
          this.toastr.error('Oops il y a une problème');
        });
      }

    }
  }

  checkUsedMail() {
    this.utilisateurService.getByLogin(this.employeur.email).subscribe(result => {
      if (result == null) {
        this.usedMail = false;
      } else {
        this.usedMail = true;
      }
    }, error => {
      this.employeInscrit = false;
      this.inscritError = true;
    });
  }
  checkPwdConfirmation(user) {
    if (this.pwdConfirmation == user.password) {
      this.pwdConfirm = true;
    } else {
      this.pwdConfirm = false;
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
