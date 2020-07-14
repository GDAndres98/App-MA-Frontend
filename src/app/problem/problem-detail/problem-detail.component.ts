import { Component, OnInit, Input } from '@angular/core';
import { Problem } from 'src/app/model/problem';
import { ActivatedRoute, Router } from '@angular/router';
import { ProblemService } from 'src/app/services/problem/problem.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { clear } from 'console';
import { UserService } from 'src/app/services/user/user.service';
import { SubmitService } from 'src/app/services/submit/submit.service';
import { Language, Submit, Veredict } from 'src/app/model/submit';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogSendComponent } from 'src/app/sends/dialog-send/dialog-send.component';

@Component({
  selector: 'app-problem-detail',
  templateUrl: './problem-detail.component.html',
  styleUrls: ['./problem-detail.component.css']
})
export class ProblemDetailComponent implements OnInit {

  @Input() problem: Problem;
  @Input() contestId: number = 1;

  form: FormGroup;
  fileToUpload: File = null;

  text: string = "Agregar Archivo";
  lastSubmits: Submit[] = [];
  veredict = Veredict;

  language;
  ll = Language;

  v: string;

  constructor(
    private routeActivate: ActivatedRoute,
    private router: Router,
    private problemService: ProblemService,
    private fb: FormBuilder,
    private userService: UserService,
    private submitService: SubmitService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog) {
    this.language = Object.keys(Language);
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;

  }

  ngOnInit(): void {
    this.form = this.fb.group({
      file: null,
      lang: Validators.required
    });
    this.form.get("lang").setValue(null);
    this.form.get("file").valueChanges.subscribe(value => {
      if (!value)
        this.text = "Agregar Archivo";
      else {
        this.text = value.split("\\").pop();
        if (this.text.length == 0)
          this.text = "Agregar Archivo";
      }

    })
    this.getProblem();
    this.getLastSubmit();

  }

  getProblem(): void {
    this.routeActivate.params.subscribe(params => {
      let id = +params['id'];

      this.problemService.getProblemById(id).subscribe(problem => {
        this.problem = problem;
      });
    })
  }
  getLastSubmit() {
    this.routeActivate.params.subscribe(params => {
      this.submitService.getLastProblemAttempt(this.userService.getId(), 1, +params['id']).subscribe(value => {
        this.lastSubmits = value;
      });
    });
  }

  onSubmit() {
    if (this.fileToUpload == null)
      return;

    if (this.form.get('lang').value == null) {
      this.snackBar.open('Por favor seleccione un lenguaje.', "Cerrar", { duration: 2000, });
      return;
    }

    this.fileToUpload.text().then(value => {
      this.submitService.submit(
        this.userService.getId(),
        this.contestId,
        this.problem.id,
        value,
        this.form.get('lang').value,
      ).subscribe(res => {
        this.snackBar.open('Envio hecho correctamente.', "Ver envíos", { duration: 2000, }).onAction().subscribe(() => this.router.navigateByUrl("\sends"));
        this.getLastSubmit();
      },
        error => {
          this.snackBar.open('Hubo un error al hacer el envio.', "Cerrar", { duration: 2000, });
        },
        () => {
          this.clearSubmit();
        });
    });
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    if (!(["cpp", "java", "py", "c"].includes(this.fileToUpload.name.split(".").pop()))) {
      this.clearSubmit();
    }
  }

  clearSubmit() {
    this.fileToUpload = null;
    this.form.get("file").setValue(null);
    this.form.get("lang").setValue(null);
    this.text = "Agregar Archivo";
  }

  openDialog(submit: Submit): void {
    const dialogRef = this.dialog.open(DialogSendComponent, {
      height: '85%',
      width: '80%',
      data: submit
    });
  }


}
