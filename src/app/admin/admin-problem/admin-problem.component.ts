import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Tag } from 'src/app/model/tag';
import { AdminService } from 'src/app/services/admin/admin.service';
import { TagService } from 'src/app/services/tag/tag.service';
import { Problem } from 'src/app/model/problem';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProblemService } from 'src/app/services/problem/problem.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-admin-problem',
  templateUrl: './admin-problem.component.html',
  styleUrls: ['./admin-problem.component.css']
})
export class AdminProblemComponent implements OnInit {
  @ViewChild('callAPIDialog') callAPIDialog: TemplateRef<any>;

  dialogRef;

  formCreate: FormGroup;
  sourceCreate: string = "";
  sourceEdit: string;


  tags: Tag[] = [];

  formEdit: FormGroup;
  editId: number = null;
  findEdit: boolean = false;
  problemEdit: Problem;

  
  delId : number = null;
  findDel: boolean = false;
  problemDel: Problem;

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private tagService: TagService,
    private snackBar: MatSnackBar,
    private problemService: ProblemService,
    private dialog: MatDialog,
  ) {
    this.tagService.getAllTags().subscribe(e => {
      this.tags = e;
    });
   }

  ngOnInit(): void {
    this.formCreate = this.fb.group({
      title:  ['', Validators.required],
      author:  ['', Validators.required],
      source:  ['', Validators.required],
      time:  ['', Validators.required],
      memory:  ['', Validators.required],
      tags:  ['', Validators.required],
    });

    this.formEdit = this.fb.group({
      title:  ['', Validators.required],
      author:  ['', Validators.required],
      source:  ['', Validators.required],
      time:  ['', Validators.required],
      memory:  ['', Validators.required],
      tags:  ['', Validators.required],
    });
  }

  onCreateProblem(){
    if(this.formCreate.valid){
      let f = this.formCreate.value;
      let problem: Problem = new Problem();
      problem.title = f.title;
      problem.author = f.author;
      problem.markdown = f.source;
      problem.timeLimit = f.time;
      problem.memoryLimit = f.memory;
      problem.tags = f.tags;
      

      this.adminService.createProblem(problem, f.tags).subscribe(
        value =>{
          this.snackBar.open('Problema creado satisfactoriamente', "Cerrar", { duration: 2000,});
          this.formCreate.reset();
        },
        err =>{
          this.snackBar.open('Hubo un error en la creación del Problema', "Cerrar", { duration: 2000,});
        }
      );
    }
  }

  searchEdit(editId: number){
      this.problemService.getProblemById(editId).subscribe(p =>{
        this.findEdit = true;
        this.problemEdit = p;
        let tags : Tag[] = new Array();
        this.tags.forEach(v =>{
          if(this.problemEdit.tags.find(x => x.id === v.id) !== undefined){
            tags.push(v);
          }
        });  

        this.formEdit = this.fb.group({
          title:    [this.problemEdit.title, Validators.required],
          author:   [this.problemEdit.author, Validators.required],
          source:   [this.problemEdit.markdown, Validators.required],
          time:     [this.problemEdit.timeLimit, Validators.required],
          memory:   [this.problemEdit.memoryLimit, Validators.required],
          tags:     [tags, Validators.required],
        });
        this.sourceEdit = this.problemEdit.markdown;
      },
      err =>{
        this.snackBar.open('Problema no existe', "Cerrar", { duration: 2000,});
        this.findEdit = false;
      });

  }

  onEditProblem(){
    if(this.formEdit.valid){
      let f = this.formEdit.value;
      this.problemEdit.title = f.title;
      this.problemEdit.author = f.author;
      this.problemEdit.markdown = f.source;
      this.problemEdit.timeLimit = f.time;
      this.problemEdit.memoryLimit = f.memory;
      this.problemEdit.tags = f.tags;
      
      this.adminService.editProblem(this.problemEdit, f.tags).subscribe(
        value =>{
          this.snackBar.open('Problema Editado satisfactoriamente', "Cerrar", { duration: 2000,});
          this.formCreate.reset();
          this.findEdit = false;
        },
        err =>{
          this.snackBar.open('Hubo un error en la creación del problema', "Cerrar", { duration: 2000,});
        }
      );
    }
    
  }

  searchDel(delId: number){
    this.problemService.getProblemById(delId).subscribe(problem =>{
      this.problemDel = problem;
      this.findDel = true;      
    },
    err =>{
      this.snackBar.open('Artículo no existe', "Cerrar", { duration: 2000,});
      this.findDel = false;
      this.problemDel = null;
    });
  }

  openDeleteDialog(problem: Problem){
    /*
    this.dialogRef = this.dialog.open(DialogArticleComponent, {
      height: '85vh',
      data: article
    });
    */
  }

  openConfirmDeleteDialog(){
    this.dialogRef = this.dialog.open(this.callAPIDialog);
  }

  deleteProblem(problemDel: Problem){

  }

}
