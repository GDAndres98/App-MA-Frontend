import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Tag } from 'src/app/model/tag';
import { AdminService } from 'src/app/services/admin/admin.service';
import { TagService } from 'src/app/services/tag/tag.service';
import { Problem } from 'src/app/model/problem';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProblemService } from 'src/app/services/problem/problem.service';
import { MatDialog } from '@angular/material/dialog';
import { TestCase } from 'src/app/model/test-case';

@Component({
  selector: 'app-admin-problem',
  templateUrl: './admin-problem.component.html',
  styleUrls: ['./admin-problem.component.css']
})
export class AdminProblemComponent implements OnInit {
  @ViewChild('callAPIDialog') callAPIDialog: TemplateRef<any>;
  @ViewChild('dialogProblemView') dialogProblemView: TemplateRef<any>;
  @ViewChild('testCaseEditDialog') testCaseEditDialog: TemplateRef<any>;

  dialogRef;

  formCreate: FormGroup;
  sourceCreate: string = "";
  sourceEdit: string;


  tags: Tag[] = [];

  dificultList : number[] = [0,1,2,3,4,5,6,7,8,9,10];

  formEdit: FormGroup;
  editId: number = null;
  findEdit: boolean = false;
  problemEdit: Problem;

  
  delId : number = null;
  findDel: boolean = false;
  problemDel: Problem;

  testId: number = null;
  findTest: boolean = false;
  problemTest: Problem;
  testCases: TestCase[] = [];
  //files: File[] = [];


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
      title:    ['', Validators.required],
      author:   ['', Validators.required],
      source:   ['', Validators.required],
      time:     ['', Validators.required],
      memory:   ['', Validators.required],
      tags:     ['', Validators.required],
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
      this.snackBar.open('Problema no existe', "Cerrar", { duration: 2000,});
      this.findDel = false;
      this.problemDel = null;
    });
  }

  searchTest(testId: number){
    this.problemService.getProblemById(testId).subscribe(problem =>{
      this.problemTest = problem;
      this.findTest = true;      
    },
    err =>{
      this.snackBar.open('Problema no existe', "Cerrar", { duration: 2000,});
      this.findTest = false;
      this.problemTest = null;
    });
  }

  openDeleteDialog(problem: Problem){
    this.dialogRef = this.dialog.open(this.dialogProblemView);
  }

  openConfirmDeleteDialog(){
    this.dialogRef = this.dialog.open(this.callAPIDialog);
  }

  deleteProblem(problemDel: Problem){
    this.adminService.deleteProblem(problemDel).subscribe(v =>{
      this.snackBar.open('Problema eliminado correctamente', "Cerrar", { duration: 2000,});
      this.findDel = false;
    },
    err =>{
      this.snackBar.open('Hubo un error en la creación del problema', "Cerrar", { duration: 2000,});
    },
    () =>{
      this.dialogRef.close();
    });
  }

  saveTestCase(){
    let todoBien: boolean = true;
    for(let i = 0; i < this.testCases.length && todoBien; i++){
      let v = this.testCases[i];

      if(v.tcInputURL === undefined || !v.tcInputURL.trim()){
        this.snackBar.open('Caso de prueba ' + (i+1) + ' tiene el input vacío', "Cerrar", { duration: 2000,});
        console.log("i" + (i+1));
        todoBien = false;
        break;
      }
      if(v.tcOutputURL  === undefined || !v.tcOutputURL.trim()){
        console.log("o" + (i+1));
        todoBien = false;
        this.snackBar.open('Caso de prueba ' + (i+1) + ' tiene el output vacío', "Cerrar", { duration: 2000,});
        break;
      }
    }


    if(todoBien){ 
      this.adminService.setTestCases(this.problemTest.id, this.testCases).subscribe(v =>{
        this.snackBar.open('Casos de prueba actualizados', "Cerrar", { duration: 2000,});
      },
      err => {
        this.snackBar.open('Hubo un error al actualizar los casos de prueba', "Cerrar", { duration: 2000,});
        
      });
    }
    
  }

  addTestCase(){
    let tc: TestCase = new TestCase();
    tc.tcDifficulty = 0;
    this.testCases.push(tc);
  }

  removeTestCase(i: number){
    this.testCases.splice(i,1);
  }


  handleFileInput(files: FileList, testCase: TestCase) {
    let file : File = files.item(0);
    if(file)
      file.text().then(v => testCase.tcInputURL = v);
  }

  handleFileOutput(files: FileList, testCase: TestCase) {
    let file :File = files.item(0);
    if(file)
      file.text().then(v => testCase.tcOutputURL = v);
  }




  openTestCaseDialog(problemTest: Problem){
    this.problemService.getProblemTCById(this.problemTest.id).subscribe(v => {
      this.testCases = v;
      console.log("nice");
      
    },
    err => {
      this.snackBar.open('Hubo un error al intentar traer los casos de prueba', "Cerrar", { duration: 2000,});
    });
    this.dialogRef = this.dialog.open(this.testCaseEditDialog, {
      height: "80vh",
      width:  "80vw",
      disableClose: true
    });
  }

}
