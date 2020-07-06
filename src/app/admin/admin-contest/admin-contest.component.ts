import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Problem } from 'src/app/model/problem';
import { AdminService } from 'src/app/services/admin/admin.service';
import { ProblemService } from 'src/app/services/problem/problem.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Contest } from 'src/app/model/contest';

@Component({
  selector: 'app-admin-contest',
  templateUrl: './admin-contest.component.html',
  styleUrls: ['./admin-contest.component.css']
})
export class AdminContestComponent implements OnInit {
  char: String = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  formCreate: FormGroup;
  passwordCreate: boolean = false;
  passwordCreateString: string;
  problemsCreate: Problem[] = [];
  problemCreateId: number; 
  problemCreate: Problem;
  findProblemCreate: boolean;

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private problemService: ProblemService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.formCreate = this.fb.group({
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

      let startTime : Date = new Date();

      startTime.setUTCFullYear(year);
      startTime.setUTCMonth(month - 1);
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
}
