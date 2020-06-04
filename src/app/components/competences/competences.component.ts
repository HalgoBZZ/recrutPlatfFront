import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { CategorieService } from 'src/app/services/categorie.service';
import { CompetenceService } from 'src/app/services/competence.service';

@Component({
  selector: 'app-competences',
  templateUrl: './competences.component.html',
  styleUrls: ['./competences.component.css']
})
export class CompetencesComponent implements OnInit {

  filter = false;
  showIntitule = true;
  showAjout = true;
  showCategorie = true;
  showModification = true;
  bsModalRef: BsModalRef;
  competenceToAdd: any = {};
  competenceToDelete;
  competenceToUpdate;
  tryToSubmit = false;
  categories;
  intituleFilter = '';
  dateAjoutFilter = '';
  dateFinFilter = '';
  competences;
  categorieFilter = '';

  constructor(private modalService: BsModalService, private toastr: ToastrService, private categorieService: CategorieService,
    private competenceService: CompetenceService) { }

  ngOnInit() {
    this.getAll();
    this.getAllCategories();
  }

  showAddModal(template) {
    this.bsModalRef = this.modalService.show(template, { class: 'modal-md' });
  }
  showFilter() {
    this.filter = !this.filter;
  }
  changeSettings(template) {
    this.bsModalRef = this.modalService.show(template, { class: 'modal-md' });
  }

  showUpdateModal(template, competence) {
    this.competenceToUpdate = competence;
    this.bsModalRef = this.modalService.show(template, { class: 'modal-md' });
  }
  showDeleteModal(template, competence) {
    this.competenceToDelete = competence;
    this.bsModalRef = this.modalService.show(template, { class: 'modal-md' });
  }

  addCompetence() {
    this.tryToSubmit = true;
    if (this.competenceToAdd && this.competenceToAdd.intitule && this.competenceToAdd.domaine) {
      this.competenceService.addCompetence(this.competenceToAdd).subscribe(res => {
        this.bsModalRef.hide();
        this.toastr.success('Succés!', 'compétence ajouté avec succés!');
        this.tryToSubmit = false;
        this.getAll();
      }, error => {
        this.toastr.error('Erreur!', 'Erreur lors d\'ajout de compétence!');
      });
    }
  }

  updateCompetence() {
    this.tryToSubmit = true;
    if (this.competenceToUpdate && this.competenceToUpdate.intitule) {
      this.competenceService.updateCompetence(this.competenceToUpdate).subscribe(res => {
        this.bsModalRef.hide();
        this.toastr.success('Succés!', 'Compétence mis à jour avec succés!');
        this.tryToSubmit = false;
      }, error => {
        this.toastr.error('Erreur!', 'Erreur lors de mise à jour de compétence');
      });
    }
  }

  deleteCompetence() {
    this.competenceService.deleteCompetencee(this.competenceToDelete.id).subscribe(res => {
      this.bsModalRef.hide();
      this.toastr.success('Succéss!', 'Compétence supprimé avec succés!');
      this.getAll();
    }, error => {
      this.toastr.error('Erreur!', 'Erreur lors de suppression de compétence');
    });
  }

  getAll() {
    this.competenceService.getAll().subscribe(res => {
      this.competences = res;
    });
  }

  getAllCategories() {
    this.categorieService.getAll().subscribe(data => {
      this.categories = data;
    });
  }

}
