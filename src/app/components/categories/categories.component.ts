import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { CategorieService } from 'src/app/services/categorie.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  filter = false;
  showIntitule = true;
  showAjout = true;
  showModification = true;
  bsModalRef: BsModalRef;
  categorieToAdd: any = {};
  categorieToDelete;
  categorieToUpdate;
  tryToSubmit = false;
  categories;
  intituleFilter = '';
  dateAjoutFilter = '';
  dateFinFilter = '';

  constructor(private modalService: BsModalService, private toastr: ToastrService, private categorieService: CategorieService) { }

  ngOnInit() {
    this.getAll();
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

  showUpdateModal(template, categorie) {
    this.categorieToUpdate = categorie;
    this.bsModalRef = this.modalService.show(template, { class: 'modal-md' });
  }
  showDeleteModal(template, categorie) {
    this.categorieToDelete = categorie;
    this.bsModalRef = this.modalService.show(template, { class: 'modal-md' });
  }

  addDomaine() {
    this.tryToSubmit = true;
    if (this.categorieToAdd && this.categorieToAdd.intitule) {
      this.categorieService.addCategorie(this.categorieToAdd).subscribe(res => {
        this.bsModalRef.hide();
        this.toastr.success('Succés!', 'Domaine ajouté avec succés!');
        this.tryToSubmit = false;
        this.getAll();
      }, error => {
        this.toastr.error('Erreur!', 'Erreur lors d\'ajout de domaine!');
      });
    }
  }

  updateDomaine() {
    this.tryToSubmit = true;
    if (this.categorieToUpdate && this.categorieToUpdate.intitule) {
      this.categorieService.updateCategorie(this.categorieToUpdate).subscribe(res => {
        this.bsModalRef.hide();
        this.toastr.success('Succés!', 'Domaine mis à jour avec succés!');
        this.tryToSubmit = false;
      }, error => {
        this.toastr.error('Erreur!', 'Erreur lors de mise à jour de domaine');
      });
    }
  }

  deleteDomaine() {
    this.categorieService.deleteCategorie(this.categorieToDelete.id).subscribe(res => {
      this.bsModalRef.hide();
      this.toastr.success('Succéss!', 'Catégorie supprimé avec succés!');
      this.getAll();
    }, error => {
      this.toastr.error('Erreur!', 'Erreur lors de suppression de catégorie');
    });
  }

  getAll() {
    this.categorieService.getAll().subscribe(res => {
      this.categories = res;
    });
  }

}
