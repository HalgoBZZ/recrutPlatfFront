import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { EmployeurService } from 'src/app/services/employeur.service';

@Component({
  selector: 'app-recruteur',
  templateUrl: './recruteur.component.html',
  styleUrls: ['./recruteur.component.css']
})
export class RecruteurComponent implements OnInit {

  filter = false;
  showEmail = false;
  showAjout = false;
  showNom = true;
  showPresentation = true;
  showTaille = true;
  showSite = true;
  showFondation = false;
  showTel = false;
  showType = true;
  showAdresse = true;
  showPays = false;
  showLogo = true;
  showModification = false;
  bsModalRef: BsModalRef;
  employeurToDelete;
  employeurs;
  employeurToDisplayDetails;
  nomFilter = '';
  presentationFilter = '';
  siteFilter = '';
  tailleFilter = '';
  adresseFilter = '';
  typeFilter = '';
  emailFilter = '';
  paysFilter = '';
  fondationFilter = '';
  ajoutFilter = '';
  modifFilter = '';

  constructor(private modalService: BsModalService, private toastr: ToastrService, private employeurService: EmployeurService) { }

  ngOnInit() {
    this.getAll();
  }

  showFilter() {
    this.filter = !this.filter;
  }
  changeSettings(template) {
    this.bsModalRef = this.modalService.show(template, { class: 'modal-md' });
  }
  showDeleteModal(template, employeur) {
    this.employeurToDelete = employeur;
    this.bsModalRef = this.modalService.show(template, { class: 'modal-md' });
  }
  showInfoModal(template, employeur) {
    this.employeurToDisplayDetails = employeur;
    this.bsModalRef = this.modalService.show(template, { class: 'modal-lg' });
  }

  deleteEmployeur() {
    this.employeurService.deleteEmployeur(this.employeurToDelete.id).subscribe(res => {
      this.bsModalRef.hide();
      this.toastr.success('Succés!', 'Employeur supprimé avec succés!');
      this.getAll();
    }, error => {
      this.toastr.error('Erreur!', 'Erreur lors de suppression de l\'employeur');
    });
  }

  getAll() {
    this.employeurService.getAll().subscribe(res => {
      this.employeurs = res;
    });
  }

}
