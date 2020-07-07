import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Problem } from 'src/app/model/problem';
import { AdminService } from 'src/app/services/admin/admin.service';
import { ProblemService } from 'src/app/services/problem/problem.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Contest } from 'src/app/model/contest';
import { ContestService } from 'src/app/services/contest/contest.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-admin-contest',
  templateUrl: './admin-contest.component.html',
  styleUrls: ['./admin-contest.component.css']
})
export class AdminContestComponent implements OnInit {
  @ViewChild('callAPIDialog') callAPIDialog: TemplateRef<any>;
  char: String = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  dialogRef;


  formCreate: FormGroup;
  passwordCreate: boolean = false;
  passwordCreateString: string;
  problemsCreate: Problem[] = [];
  problemCreateId: number; 
  problemCreate: Problem;
  findProblemCreate: boolean;

  formEdit: FormGroup;
  passwordEdit: boolean = false;
  passwordEditString: string;
  problemsEdit: Problem[] = [];
  problemEditId: number; 
  problemEdit: Problem;
  findProblemEdit: boolean;
  editId: number;
  findContestEdit: boolean = false;
  contestEdit: Contest;


  deleteId: number;
  findDeleteContest: boolean = false;
  contestDelete: Contest;

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private problemService: ProblemService,
    private snackBar: MatSnackBar,
    private contestService: ContestService,
    private dialog: MatDialog,

  ) { }

  ngOnInit(): void {
    this.formCreate = this.fb.group({
      name:       ['', Validators.required],
      password:   [''],
      dateStart:  ['', Validators.required],
      timeStart:  ['', Validators.required],
      duration:   ['', Validators.required],
    });

    this.formEdit = this.fb.group({
      name:       ['', Validators.required],
      password:   [''],
      dateStart:  ['', Validators.required],
      timeStart:  ['', Validators.required],
      duration:   ['', Validators.required],
    });
  }

  drop(event: CdkDragDrop<Problem[]>) {
    moveItemInArray(this.problemsCreate, event.previousIndex, event.currentIndex);
  }
  

  onCreateContest(){
    if(this.formCreate.valid){
      console.log(this.formCreate.value.dateStart);
      
      let year : number = Number(this.formCreate.value.dateStart.split('-')[0]);
      let month : number = Number(this.formCreate.value.dateStart.split('-')[1]);
      let day : number = Number(this.formCreate.value.dateStart.split('-')[2]);


      let hour : number = Number(this.formCreate.value.timeStart.split(':')[0]);
      let minute : number = Number(this.formCreate.value.timeStart.split(':')[1]);

      let startTime : Date = new Date(this.formCreate.value.dateStart);

      console.log(year);
      console.log(month);
      console.log(day);
      
      
      console.log(startTime);
      
      //startTime.setFullYear(year);
      //startTime.setMonth(month - 1);
      startTime.setUTCDate(day);
      startTime.setUTCHours(hour);
      startTime.setUTCMinutes(minute);
      startTime.setUTCSeconds(0);
      
      console.log(startTime);

      hour = Number(this.formCreate.value.duration.split(':')[0]);
      minute = Number(this.formCreate.value.duration  .split(':')[1]);

      hour = hour * 3600000 + minute * 60000;

      let endTime : Date = new Date(startTime.getTime() + hour);

      console.log(endTime);

      let contest: Contest = new Contest();

      contest.name = this.formCreate.value.name;
      contest.private = this.passwordCreate;
      contest.startTime = startTime;
      contest.endTime = endTime;

      this.problemsCreate.forEach((v, i) =>{
        v.letter = this.char[i];        
      });

      this.adminService.createContest(contest, this.passwordCreateString, this.problemsCreate).subscribe(v =>{
        this.snackBar.open('Competencia creada correctamente', "Cerrar", { duration: 2000,});
        this.passwordCreate = false;
        this.passwordCreateString = "";
        this.problemsCreate = [];
        this.problemCreate = null;
        this.findProblemCreate = false;
        this.formCreate.reset();
      },
      err =>{
        this.snackBar.open('Hubo un error al crear la competencia', "Cerrar", { duration: 2000,});
      })
    }
  }

  deleteProblemCreate(i: number){
    this.problemsCreate.splice(i, 1);
  }

  searchProblemCreate(id: number){
    this.problemService.getProblemById(id).subscribe(p =>{
      this.problemCreate = p;
      this.findProblemCreate = true;
      this.problemCreateId = null;
    },
    error =>{
      this.snackBar.open('Problema no encontrado', "Cerrar", { duration: 2000,});
    });
  }

  addCreateProblem(problem: Problem){
    if(this.problemsCreate.find(v => v.id == problem.id) === undefined){
      this.problemsCreate.push(problem);
      this.problemCreate = null;
      this.findProblemCreate = false;
    }
    else{
      this.snackBar.open('El problema ya se encuentra en la lista', "Cerrar", { duration: 2000,});
    }
  }

  onEditContest(){
    if(this.formEdit.valid){
      console.log(this.formEdit.value.dateStart);
      
      let year : number = Number(this.formEdit.value.dateStart.split('-')[0]);
      let month : number = Number(this.formEdit.value.dateStart.split('-')[1]);
      let day : number = Number(this.formEdit.value.dateStart.split('-')[2]);


      let hour : number = Number(this.formEdit.value.timeStart.split(':')[0]);
      let minute : number = Number(this.formEdit.value.timeStart.split(':')[1]);

      let startTime : Date = new Date(this.formEdit.value.dateStart);

      console.log(year);
      console.log(month);
      console.log(day);  
      
  
      console.log(startTime);
      
      //startTime.setFullYear(year);
      //startTime.setMonth(month - 1);
      startTime.setUTCDate(day);
      startTime.setUTCHours(hour);
      startTime.setUTCMinutes(minute);
      startTime.setUTCSeconds(0);
      
      
      console.log(startTime);

      hour = Number(this.formEdit.value.duration.split(':')[0]);
      minute = Number(this.formEdit.value.duration.split(':')[1]);

      hour = hour * 3600000 + minute * 60000;

      let endTime : Date = new Date(startTime.getTime() + hour);

      console.log(endTime);

      this.contestEdit.name = this.formEdit.value.name;
      this.contestEdit.private = this.passwordEdit;
      this.contestEdit.startTime = startTime;
      this.contestEdit.endTime = endTime;

      this.problemsCreate.forEach((v, i) =>{
        v.letter = this.char[i];        
      });

      this.adminService.editContest(this.contestEdit, this.passwordEditString, this.problemsEdit).subscribe(v =>{
        this.snackBar.open('Competencia editada correctamente', "Cerrar", { duration: 2000,});
        this.passwordEdit = false;
        this.passwordEditString = "";
        this.problemsEdit = [];
        this.problemEdit = null;
        this.findProblemEdit = false;
        this.formEdit.reset();
        this.findContestEdit = false;
      },
      err =>{
        this.snackBar.open('Hubo un error al editar la competencia', "Cerrar", { duration: 2000,});
      })
    }
  }

  searchEdit(editId: number){
    this.contestService.getContestAdmin(editId).subscribe(v =>{
      this.contestEdit = v;

      this.contestEdit.startTime = new Date(this.contestEdit.startTime);
      this.contestEdit.endTime = new Date(this.contestEdit.endTime);
      console.log(this.contestEdit);
      
      let duration = this.contestEdit.endTime.getTime() - this.contestEdit.startTime.getTime();
      let h: number = Math.floor(duration / 3600000);
      let m: number = Math.floor((duration % 3600000) / 60000);
      this.formEdit.get("name").setValue(this.contestEdit.name);
      this.formEdit.get("dateStart").setValue(this.contestEdit.startTime.getFullYear()+ "-" + (this.contestEdit.startTime.getMonth()+1) + "-" + this.contestEdit.startTime.getDate());      
      this.formEdit.get("timeStart").setValue(this.contestEdit.startTime.getHours() + ":" + this.contestEdit.startTime.getMinutes());
      this.formEdit.get("duration").setValue(h + ":" + m);
      console.log(this.formEdit.get("dateStart").value);
      

      this.problemsEdit = [];
      this.contestEdit.problems.forEach(v =>{
        let p : Problem = new Problem();
        p.id = v.id;
        p.letter = v.letter;
        p.title = v.title;
        this.problemsEdit.push(p)
      });

      this.problemsEdit.sort((x,y) =>{
        return x.letter.localeCompare(y.letter);
      })

      this.findContestEdit = true;
    },
    err =>{
      this.snackBar.open('La competencia no existe', "Cerrar", { duration: 2000,});
    });
  }

  searchProblemEdit(problemEditId: number){
    this.problemService.getProblemById(problemEditId).subscribe(p =>{
      this.problemEdit = p;
      this.findProblemEdit = true;
      this.problemEditId = null;
    },
    error =>{
      this.snackBar.open('Problema no encontrado', "Cerrar", { duration: 2000,});
    });
  }

  addEditProblem(problem: Problem){
    if(this.problemsEdit.find(v => v.id == problem.id) === undefined){
      this.problemsEdit.push(problem);
      this.problemEdit = null;
      this.findProblemEdit = false;
    }
    else{
      this.snackBar.open('El problema ya se encuentra en la lista', "Cerrar", { duration: 2000,});
    }
  }

  deleteProblemEdit(i: number){
    this.problemsEdit.splice(i, 1);
  }

  searchDelete(deleteId: number){
    this.contestService.getContestAdmin(deleteId).subscribe(v =>{
      this.contestDelete = v;
      this.findDeleteContest = true;
    },
    err =>{
      this.snackBar.open('La competencia no existe', "Cerrar", { duration: 2000,});
    });
  }

  deleteContest(id: number){
    this.adminService.deleteContest(id).subscribe(v =>{
      this.snackBar.open('Compentencia eliminada correctamente', "Cerrar", { duration: 2000,});
      this.deleteContest = null;
      this.findDeleteContest = false;
      this.deleteId = null;
    }, 
    err =>{
      this.snackBar.open('Hubo un error al intentar eliminar la compentencia', "Cerrar", { duration: 2000,});
    },
    () =>{
      this.dialogRef.close();
    });
  }

  openConfirmDeleteDialog(){
    this.dialogRef = this.dialog.open(this.callAPIDialog);
  }
}
