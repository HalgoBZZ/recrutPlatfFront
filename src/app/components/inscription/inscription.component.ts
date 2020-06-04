import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employeur } from 'src/app/modals/Employeur.';
import { Candidat } from 'src/app/modals/Candidat';
import { ToastrService } from 'ngx-toastr';
import { PaysService } from 'src/app/services/pays.service';
import { EmployeurService } from 'src/app/services/employeur.service';
import { CandidatService } from 'src/app/services/candidat.service';
import { UtilisateurService } from 'src/app/services/utilisateur.service';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {
  cmptEmployeur = false;
  cmptCandidat = false;
  choose = false;
  tryToSubmit = false;

  candidat = new Candidat();
  employeur = new Employeur();
  pwdConfirmation = '';
  employeInscrit: boolean;
  inscritError: boolean;
  pwdConfirm = false;
  usedMail = false;
  savedFile;
  pathfile;
  paysList = [];
  constructor(private router: Router, private toastr: ToastrService, private utilisateurService: UtilisateurService,
    private employeurService: EmployeurService, private candidatService: CandidatService, private paysService: PaysService) { }

  ngOnInit() {
    this.getPays();
    this.employeur.password = '';
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
    this.tryToSubmit = true;
    if (this.cmptCandidat) {
      if (this.verifInscriptionCandidat(this.candidat)) {
        this.candidatService.inscription(this.candidat).subscribe(result => {
          // this.data = result;
          this.successInscritpion();
          // if (result != null) {
          //   this.saveImageCandidat(this.data.id);
          //   this.successInscritpion();
          // } else {
          //   this.errorInscription();
          // }
        }, error => {
          console.log('this.errorInscription');
          this.errorInscription();
        });
      }
    } else if (this.cmptEmployeur) {
      if (this.verifInscriptionEmployeur(this.employeur)) {
        this.employeurService.inscription(this.employeur).subscribe(result => {
          this.successInscritpion();
          // if (result != null) {
          //   this.saveImageEmployeur(this.data.id);
          //   this.successInscritpion();
          // } else {
          //   this.errorInscription();
          // }
        }, error => {
          this.errorInscription();
        });
      }
    }
  }
  errorInscription() {
    this.employeInscrit = false;
    this.inscritError = true;
    this.toastr.error('Oops il y a une problème');
  }
  successInscritpion() {
    this.toastr.success('votre inscription est effectué avec succés');
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 3000);
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
  checkPwdConfirmation() {
    if (this.cmptCandidat) {
      if (this.pwdConfirmation === this.candidat.password) {
        this.pwdConfirm = true;
      } else {
        this.pwdConfirm = false;
      }
    } else if (this.cmptEmployeur) {
      if (this.pwdConfirmation === this.employeur.password) {
        this.pwdConfirm = true;
      } else {
        this.pwdConfirm = false;
      }
    }
  }
  back() {
    this.tryToSubmit = false;
    this.pwdConfirmation = '';
    this.usedMail = false;
    if (!this.choose) {
      this.router.navigate(['/login']);
    } else {
      this.choose = false;
    }
  }
  handleImageCandidatInput(event) {
    const files = event.target.files;
    if (files) {
      const reader = new FileReader();
      reader.onload = this.handleReaderLoadedCandPic.bind(this);
      this.candidat.photo = reader.readAsBinaryString(files[0]);
    }
  }
  private handleReaderLoadedCandPic(readerEvt) {
    const binaryString = readerEvt.target.result;
    this.candidat.photo = btoa(binaryString);
  }

  handleImageEmployeurInput(event) {
    const files = event.target.files;
    if (files) {
      const reader = new FileReader();
      reader.onload = this.handleReaderLoadedEmpl.bind(this);
      this.employeur.photo = reader.readAsBinaryString(files[0]);
    }
  }

  handleReaderLoadedEmpl(readerEvt) {
    const binaryString = readerEvt.target.result;
    this.employeur.photo = btoa(binaryString);
  }

  handleCVCandidatInput(event) {
    const files = event.target.files;
    if (files) {
      const reader = new FileReader();
      reader.onload = this.handleReaderLoadedCandCV.bind(this);
      this.candidat.pieceJointe = reader.readAsBinaryString(files[0]);
    }
  }
  private handleReaderLoadedCandCV(readerEvt) {
    const binaryString = readerEvt.target.result;
    this.candidat.pieceJointe = btoa(binaryString);
  }

  verifRequired(field) {
    if (field) {
      return true;
    }
    return false;
  }

  verifUrlField(field) {
    const pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return pattern.test(field);
  }

  verifConfirmationPassword(pwd, confirmation) {
    return pwd === confirmation;
  }

  verifEmailField(field) {
    // tslint:disable-next-line:max-line-length
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(field).toLowerCase());
  }

  verifPassWordField(pwd) {
    const re = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})');
    return re.test(pwd);
  }

  verifTelField(tel) {
    const phoneno = new RegExp(/^\+?([0-9]{2})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{3})$/);
    return phoneno.test(String(tel));
  }

  verifInscriptionCandidat(candidat) {
    return (this.verifRequired(candidat.nom) && this.verifRequired(candidat.prenom) && this.candidat.photo
      && this.verifRequired(candidat.dateNaissance) && this.verifRequired(candidat.diplome) && this.candidat.pieceJointe &&
      this.verifRequired(candidat.tel) && this.verifRequired(candidat.adresse) && this.verifRequired(candidat.titre) &&
      this.verifRequired(candidat.nationalite) && this.verifRequired(candidat.email) && this.verifRequired(candidat.password) &&
      this.verifTelField(candidat.tel) && this.verifEmailField(candidat.email) && this.verifPassWordField(candidat.password) &&
      this.verifConfirmationPassword(candidat.password, this.pwdConfirmation) && !this.usedMail);
  }

  verifInscriptionEmployeur(employeur) {
    return (this.verifRequired(employeur.nom) && this.verifRequired(employeur.presentation) && this.verifRequired(employeur.photo)
      && this.verifRequired(employeur.site) && this.verifRequired(employeur.taille) && this.verifRequired(employeur.type) &&
      this.verifRequired(employeur.fondation) && this.verifRequired(employeur.adresse) && this.verifRequired(employeur.pays) &&
      this.verifRequired(employeur.email) && this.verifRequired(employeur.password) &&
      this.verifUrlField(employeur.site) && this.verifEmailField(employeur.email) && this.verifPassWordField(employeur.password) &&
      this.verifConfirmationPassword(employeur.password, this.pwdConfirmation) && !this.usedMail);
  }


  getPays() {
    this.paysList = this.paysService.getPaysList();
  }


}
