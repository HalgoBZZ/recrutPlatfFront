import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { CompetenceService } from 'src/app/services/competence.service';
import { CandidatCompetenceService } from 'src/app/services/candidat-competence.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { CandidatService } from 'src/app/services/candidat.service';

@Component({
  selector: 'app-mes-competences',
  templateUrl: './mes-competences.component.html',
  styleUrls: ['./mes-competences.component.css']
})
export class MesCompetencesComponent implements OnInit {

  bsModalRef: BsModalRef;
  tryToSubmit = false;
  candidatCompetences;
  listCompetences;
  competencesToAdd = [];
  dropdownSettings: IDropdownSettings;
  candidat;
  login;

  constructor(private modalService: BsModalService, private toastr: ToastrService, private competenceService: CompetenceService,
    private candidatCompetenceService: CandidatCompetenceService, private spinner: NgxSpinnerService,
    private candidatService: CandidatService) { }

  ngOnInit() {
    this.spinner.show();
    this.login = localStorage.getItem('login');
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'intitule',
      selectAllText: 'Selectionner tous',
      unSelectAllText: 'Deselectionner tous',
      itemsShowLimit: 1000,
      allowSearchFilter: true
    };
    this.getAll();
    this.getAllCompetences();
  }

  showAddModal(template) {
    this.bsModalRef = this.modalService.show(template, { class: 'modal-md' });
  }

  addCompetences() {
    this.candidatService.getCandidatByLogin(this.login).subscribe(cnd => {
      this.candidat = cnd;
      for (const cmp of this.competencesToAdd) {
        const candidatComp = {
          candidat: this.candidat,
          competence: cmp
        };
        this.candidatCompetenceService.save(candidatComp).subscribe(data => {
          this.spinner.hide();
        }, error => {
          this.toastr.error('Erreur!', 'Erreur lors d\'ajout des compétences!');
          this.spinner.hide();
        });
      }
      this.getAll();
      this.toastr.success('Succés!', 'Compétences ajouté avec succés!');
    }, error => {
      this.toastr.error('Erreur!', 'Erreur lors de recuperation du candidat!');
      this.spinner.hide();
    });
    this.bsModalRef.hide();
  }

  getAll() {
    this.candidatService.getCandidatByLogin(this.login).subscribe(cnd => {
      const candidat: any = cnd;
      this.candidatCompetenceService.getByCandidat(candidat.id).subscribe(data => {
        this.candidatCompetences = data;
      }, error => {
        console.log('erreur lors de recuperation de la liste des compétences par candidat');
      });
    }, error => {
      console.log('erreur lors de recuperation de candidat');
    });
  }

  back(i) {
    console.log('i % 5=', i % 5)
    if (i === 0) {
      return false;
    } else {
      return (i % 5 === 0);
    }
  }

  delete(cmp) {
    this.spinner.show();
    this.candidatCompetenceService.delete(cmp.id).subscribe(data => {
      this.getAll();
      this.toastr.success('Succés!', 'Compétences supprimé avec succés!');
      this.spinner.hide();
    }, error => {
      this.toastr.error('Erreur!', 'Erreur lors de suppression de le compétence!');
      this.spinner.hide();
    });
  }

  onItemSelect(item) {
    this.competencesToAdd.push(item);
  }

  onSelectAll(items) {
    this.competencesToAdd = items;
  }

  getAllCompetences() {
    this.competenceService.getAll().subscribe(data => {
      this.listCompetences = data;
      this.spinner.hide();
    }, error => {
      console.log('error when get competences list');
      this.spinner.hide();
    });
  }
}
