import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PaysService } from 'src/app/services/pays.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { UtilisateurService } from 'src/app/services/utilisateur.service';
import { EmployeurService } from 'src/app/services/employeur.service';
import { CandidatService } from 'src/app/services/candidat.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  employeur = false;
  candidat = false;
  update = false;
  admin = false;
  tryToSubmit = false;
  fileToUploadCVCandidat;
  loggedUser: any = {};
  usedMail = false;
  employeModifie = false;
  updateError = true;
  pwdConfirmation = '';
  pwdConfirm = false;
  password = '';
  fileToUpload;
  fileToUploadEmployeur;
  cvContent;
  paysList = [];

  constructor(private utilisateurService: UtilisateurService, private employeurService: EmployeurService,
    private candidatService: CandidatService, private toastr: ToastrService, private paysService: PaysService,
    private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.spinner.show();
    this.getConnectedUser();
    this.getPays();
  }

  showFormUpdate() {
    this.update = true;
  }


  modifierMonCompteAdmin() {
    this.tryToSubmit = true;
    if (this.verifUpdateAdmin()) {
      this.spinner.show();
      this.loggedUser.password = this.password;
      this.utilisateurService.updateUser(this.loggedUser).subscribe(data => {
        this.successUpdate();
        this.loggedUser = data;
        this.update = false;
        this.spinner.hide();
        location.reload();
      }, error => {
        this.errorUpdate();
        this.spinner.hide();
      });
    }
  }
  modifierMonCompteEmployeur() {
    this.tryToSubmit = true;
    if (this.verifUpdateEmployeur()) {
      this.spinner.show();
      this.loggedUser.password = this.password;
      this.employeurService.updateEmployeur(this.loggedUser).subscribe(data => {
        this.loggedUser = data;
        this.successUpdate();
        this.update = false;
        this.spinner.hide();
        location.reload();
      }, error => {
        this.errorUpdate();
        this.spinner.hide();
      });
    }
  }

  modifierMonCompteCandidat() {
    this.tryToSubmit = true;
    if (this.verifUpdateCandidat()) {
      this.spinner.show();
      this.loggedUser.password = this.password;
      this.candidatService.updateCandidat(this.loggedUser).subscribe(data => {
        this.loggedUser = data;
        this.successUpdate();
        this.update = false;
        this.spinner.hide();
        location.reload();
      }, error => {
        this.spinner.hide();
      });
    }
  }

  successUpdate() {
    this.toastr.success('Vos données sont mis à jour avec succés');
  }

  errorUpdate() {
    this.toastr.error('Oops il y a une problème');
  }

  annulerModification() {
    this.update = false;
  }

  getConnectedUser() {
    const login = localStorage.getItem('login');
    this.utilisateurService.getByLogin(login).subscribe(data => {
      this.loggedUser = data;
      if (this.loggedUser.role === 'CANDIDAT') {
        this.candidat = true;
        this.employeur = false;
        this.admin = false;
        this.cvContent = 'data:application/octet-stream;base64,' + this.loggedUser.pieceJointe;
      }
      if (this.loggedUser.role === 'EMPLOYEUR') {
        this.employeur = true;
        this.candidat = false;
        this.admin = false;
      }
      if (this.loggedUser.role === 'ADMIN') {
        this.employeur = false;
        this.candidat = false;
        this.admin = true;
      }
      this.spinner.hide();
    }, error => {
      this.spinner.hide();
    });
  }


  checkUsedMail() {
    const login = localStorage.getItem('login');
    this.utilisateurService.getByLogin(login).subscribe(data => {
      const user: any = data;
      if (this.loggedUser.email !== user.email) {
        this.utilisateurService.getByLogin(this.loggedUser.email).subscribe(result => {
          if (result == null) {
            this.usedMail = false;
          } else {
            this.usedMail = true;
          }
        }, error => {
          this.employeModifie = false;
          this.updateError = true;
        });
      } else {
        this.usedMail = false;
      }
    });
  }

  checkPwdConfirmation() {
    if (this.pwdConfirmation === this.loggedUser.password) {
      this.pwdConfirm = true;
    } else {
      this.pwdConfirm = false;
    }
  }

  verifRequired(field) {
    if (field) {
      return true;
    }
    return false;
  }

  verifTelField(tel) {
    const phoneno = new RegExp(/^\+?([0-9]{2})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{3})$/);
    return phoneno.test(String(tel));
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

  verifConfirmationPassword(pwd, confirmation) {
    return pwd === confirmation;
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

  verifUpdateCandidat() {
    return (this.verifRequired(this.loggedUser.nom) && this.verifRequired(this.loggedUser.prenom) &&
      this.verifRequired(this.loggedUser.dateNaissance) &&
      this.verifRequired(this.loggedUser.diplome) &&
      this.verifRequired(this.loggedUser.tel) && this.verifRequired(this.loggedUser.adresse) &&
      this.verifRequired(this.loggedUser.titre) && this.verifRequired(this.loggedUser.nationalite) &&
      this.verifRequired(this.loggedUser.email) && this.verifRequired(this.password) &&
      this.verifTelField(this.loggedUser.tel) && this.verifEmailField(this.loggedUser.email) &&
      this.verifPassWordField(this.password) && this.verifConfirmationPassword(this.password, this.pwdConfirmation) && !this.usedMail);
  }

  verifUpdateEmployeur() {
    return (this.verifRequired(this.loggedUser.nom) && this.verifRequired(this.loggedUser.presentation) &&
      this.verifRequired(this.loggedUser.site) &&
      this.verifRequired(this.loggedUser.taille) && this.verifRequired(this.loggedUser.type) &&
      this.verifRequired(this.loggedUser.fondation) && this.verifRequired(this.loggedUser.adresse) &&
      this.verifRequired(this.loggedUser.pays) && this.verifRequired(this.loggedUser.email) &&
      this.verifRequired(this.password) && this.verifUrlField(this.loggedUser.site) &&
      this.verifEmailField(this.loggedUser.email) && this.verifPassWordField(this.password) &&
      this.verifConfirmationPassword(this.password, this.pwdConfirmation) && !this.usedMail);
  }

  verifUpdateAdmin() {
    return (this.verifRequired(this.loggedUser.email) && this.verifPassWordField(this.password) &&
      this.verifConfirmationPassword(this.password, this.pwdConfirmation) && !this.usedMail && this.verifRequired(this.password)
      && this.verifEmailField(this.loggedUser.email));
  }

  getPays() {
    this.paysList = this.paysService.getPaysList();
  }

  openPDF(pj) {
    const linkSource = `data:application/pdf;base64,${pj}`;
    const downloadLink = document.createElement('a');
    const fileName = 'CV.pdf';
    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
  }

  handleImageEmployeurInput(event) {
    const files = event.target.files;
    if (files) {
      const reader = new FileReader();
      reader.onload = this.handleReaderLoadedEmpl.bind(this);
      this.loggedUser.photo = reader.readAsBinaryString(files[0]);
    }
  }

  handleReaderLoadedEmpl(readerEvt) {
    const binaryString = readerEvt.target.result;
    this.loggedUser.photo = btoa(binaryString);
  }

  handleCVCandidatInput(event) {
    const files = event.target.files;
    if (files) {
      const reader = new FileReader();
      reader.onload = this.handleReaderLoadedCandCV.bind(this);
      this.loggedUser.pieceJointe = reader.readAsBinaryString(files[0]);
    }
  }
  private handleReaderLoadedCandCV(readerEvt) {
    const binaryString = readerEvt.target.result;
    this.loggedUser.pieceJointe = btoa(binaryString);
  }

  handleImageCandidatInput(event) {
    const files = event.target.files;
    if (files) {
      const reader = new FileReader();
      reader.onload = this.handleReaderLoadedCandPic.bind(this);
      this.loggedUser.photo = reader.readAsBinaryString(files[0]);
    }
  }
  private handleReaderLoadedCandPic(readerEvt) {
    const binaryString = readerEvt.target.result;
    this.loggedUser.photo = btoa(binaryString);
  }
}
