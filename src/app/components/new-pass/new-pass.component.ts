import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';
import { UtilisateurService } from 'src/app/services/UtilisateurService';
import { ToastrService } from 'ngx-toastr';
import { EmployeurService } from 'src/app/services/EmployeurService';
import { CandidatService } from 'src/app/services/CandidatService';

@Component({
  selector: 'app-new-pass',
  templateUrl: './new-pass.component.html',
  styleUrls: ['./new-pass.component.css']
})
export class NewPassComponent implements OnInit {
  codeRecu = false;
  pwd;
  confirmation;
  tryToSubmit = false;
  state$: Observable<object>;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private toastr: ToastrService,
              private location: Location, private utilisateurService: UtilisateurService, private employeurService: EmployeurService,
              private candidatService: CandidatService) { }

  ngOnInit() {
    console.log(history.state);
    console.log(this.location.getState());
  }

  back() {
    this.router.navigate(['/verification']);
  }

  submitNewPass() {
    this.tryToSubmit = true;
    if (this.verifConfirmationPassword(this.pwd, this.confirmation) && this.verifPassWordField(this.pwd) && this.verifRequired(this.pwd)) {
      const user: any = this.location.getState();
      if (user.role === 'CANDIDAT') {
        this.candidatService.getById(user.id).subscribe(res => {
          const candidat: any = res;
          candidat.password = this.pwd;
          this.candidatService.updateCandidat(candidat).subscribe(result => {
            this.successToast();
            setTimeout(() => {
              this.router.navigate(['/login']);
            }, 500);
          }, error => {
            this.tryToSubmit = false;
            this.errorToast();
          });
        });
      } else if (user.role === 'EMPLOYEUR') {
          this.employeurService.getById(user.id).subscribe(res => {
            const employeur: any = res;
            employeur.password = this.pwd;
            this.employeurService.updateEmployeur(employeur).subscribe(result => {
              this.successToast();
              setTimeout(() => {
                this.router.navigate(['/login']);
              }, 500);
            }, error => {
              this.tryToSubmit = false;
              this.errorToast();
            });
          });
      }
    }
  }

  successToast() {
    this.toastr.success('Mot de passe mise à jour avec succés');
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 3000);
  }

  errorToast() {
    this.toastr.error('Oops il y a une problème lors de mise à jour de mot de passe');
  }

  verifConfirmationPassword(pwd, confirmation) {
    return pwd === confirmation;
  }

  verifPassWordField(pwd) {
    const re = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})');
    return re.test(pwd);
  }

  verifRequired(field) {
    if (field) {
      return true;
    }
    return false;
  }

}
