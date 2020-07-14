import { Component, OnInit, Input, TemplateRef, ViewChild } from '@angular/core';
import { ProblemService } from 'src/app/services/problem/problem.service';
import { Problem } from 'src/app/model/problem';
import { Contest } from 'src/app/model/contest';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Veredict, Language } from 'src/app/model/submit';
import { UserService } from 'src/app/services/user/user.service';
import { SubmitService } from 'src/app/services/submit/submit.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-problem-embedded',
  templateUrl: './problem-embedded.component.html',
  styleUrls: ['./problem-embedded.component.css']
})
export class ProblemEmbeddedComponent implements OnInit {


  @Input() contest: Contest;
  @Input('index')
  set index(index: number) {
    this._index = index;
    this.getProblem();
  }
  @Input() inContest=true;


  @ViewChild('callAPIDialog') callAPIDialog: TemplateRef<any>;
  dialogRef;

  _index: number = 0;
  problem: Problem;
  isLoading: boolean;


  form: FormGroup;
  fileToUpload: File = null;

  text: string = "Agregar Archivo";
  veredict = Veredict;

  language;
  ll = Language;

  v: string;

  constructor(
    private problemService: ProblemService,
    private fb: FormBuilder,
    private userService: UserService,
    private submitService: SubmitService,
    private snackBar: MatSnackBar,
    private router: Router,
    private dialog: MatDialog) {
    this.language = Object.keys(Language);
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
  }

  getProblem() {
    this.isLoading = true;

    if (this.contest)
      this.problemService.getProblemById(this.contest.problems[this._index].id).subscribe(problem => {
        this.problem = problem;
        this.isLoading = false;
      });
  }



  openSendDialog() {
    this.dialogRef = this.dialog.open(this.callAPIDialog);
  }


  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    if (!(["cpp", "java", "py", "c"].includes(this.fileToUpload.name.split(".").pop()))) {
      this.clearSubmit();
    }
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
        this.contest.id,
        this.problem.id,
        value,
        this.form.get('lang').value,
      ).subscribe(res => {
        this.snackBar.open('Envio hecho correctamente.', this.inContest? "Ver envíos":"", { duration: 5000, }).onAction().subscribe(
          () => {
            this.dialog.closeAll();
            this.router.navigateByUrl("/contest/" + this.contest.id + "/status");
          });
      },
        error => {
          this.snackBar.open('Hubo un error al hacer el envio.', "Cerrar", { duration: 3000, });
        },
        () => {
          this.clearSubmit();
        });
    });
  }

  clearSubmit() {
    this.fileToUpload = null;
    this.form.get("file").setValue(null);
    this.form.get("lang").setValue(null);
    this.text = "Agregar Archivo";
  }



}
