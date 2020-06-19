import { Component, OnInit, Input } from '@angular/core';
import { Problem } from 'src/app/model/problem';
import { ActivatedRoute } from '@angular/router';
import { ProblemService } from 'src/app/services/problem/problem.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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


  constructor(private route: ActivatedRoute,
    private problemService: ProblemService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      file: null
    });

    this.form.get("file").valueChanges.subscribe(value =>{
      this.text = value.split("\\").pop();
      if(this.text.length == 0)
        this.text = "Agregar Archivo";

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
      console.log(this.fileToUpload);
      this.fileToUpload.text().then(value =>{
        console.log(value);
      })
      
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    if(!(["cpp", "java", "py", "c"].includes(this.fileToUpload.name.split(".").pop()))){
      this.fileToUpload = null;
      this.text = "Agregar Archivo";
    }
  }

}
