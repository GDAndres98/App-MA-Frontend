import { Component, OnInit, Input } from '@angular/core';
import { Problem } from 'src/app/model/problem';
import { ActivatedRoute } from '@angular/router';
import { ProblemService } from 'src/app/services/problem/problem.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { clear } from 'console';
import { UserService } from 'src/app/services/user/user.service';
import { SubmitService } from 'src/app/services/submit/submit.service';
import { Language } from 'src/app/model/submit';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-problem-detail',
  templateUrl: './problem-detail.component.html',
  styleUrls: ['./problem-detail.component.css']
})
export class ProblemDetailComponent implements OnInit {

  @Input() problem: Problem;

  form: FormGroup;
  fileToUpload: File = null;

  text: string = "Agregar Archivo";


  constructor(
    private route: ActivatedRoute,
    private problemService: ProblemService,
    private fb: FormBuilder,
    private userService: UserService,
    private submitService: SubmitService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      file: null
    });

    this.form.get("file").valueChanges.subscribe(value =>{
      if(!value)
        this.text = "Agregar Archivo";
      else{
        this.text = value.split("\\").pop();
        if(this.text.length == 0)
          this.text = "Agregar Archivo";
      }

    })
    this.getProblem();
  }

  getProblem(): void {
    this.route.params.subscribe(params =>{
      let id = +params['id'];
      console.log(id);
      
      this.problemService.getProblemById(id).subscribe(problem => {
        this.problem = problem;
        console.log(problem);
      });
    })

  }

  onSubmit(){
        if(this.fileToUpload == null)
        return;
      this.fileToUpload.text().then(value =>{
        this.submitService.submit(
          this.userService.getId(),
          1,
          this.problem.id,
          value,
          Language.Cpp_11
          ).subscribe(res =>{
            this.snackBar.open('Envio hecho correctamente.', "Cerrar", { duration: 2000,});
          },
          error =>{
            this.snackBar.open('Hubo un error al hacer el envio.', "Cerrar", { duration: 2000,});
          },
          () =>{
            this.clearSubmit();
          });
      });
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    if(!(["cpp", "java", "py", "c"].includes(this.fileToUpload.name.split(".").pop()))){
      this.clearSubmit();
    }
  }

  clearSubmit(){
    this.fileToUpload = null;
    this.form.get("file").setValue(null);
    this.text = "Agregar Archivo";
  }

}
