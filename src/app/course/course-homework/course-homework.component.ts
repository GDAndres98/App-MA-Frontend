import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Problem } from 'src/app/model/problem';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProblemService } from 'src/app/services/problem/problem.service';
import { TestCase } from 'src/app/model/test-case';
import { MatSliderChange } from '@angular/material/slider';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from 'src/app/services/course/course.service';
import { Course } from 'src/app/model/course';
import { ContestService } from 'src/app/services/contest/contest.service';
import { Veredict, Language, Submit } from 'src/app/model/submit';
import { SubmitService } from 'src/app/services/submit/submit.service';
import { UserService } from 'src/app/services/user/user.service';
import { DialogSendComponent } from 'src/app/sends/dialog-send/dialog-send.component';
import { User } from 'src/app/model/User';

@Component({
  selector: 'app-course-homework',
  templateUrl: './course-homework.component.html',
  styleUrls: ['./course-homework.component.css']
})
export class CourseHomeworkComponent implements OnInit {
  @ViewChild('addProblemDialog') addArticleDialog: TemplateRef<any>;
  @ViewChild('homeworkView') homeworkView: TemplateRef<any>;
  @ViewChild('submitDialog') submitView: TemplateRef<any>;
  @ViewChild('gradesDialog') gradesDialog: TemplateRef<any>;
  @ViewChild('editHomework') editHomework: TemplateRef<any>;
  @ViewChild('deleteHomeworkDialog') deleteHomeworkDialog: TemplateRef<any>;

  dialogRef;

  formCreate: FormGroup;

  problemId: number;
  problem: Problem;
  findProblem: boolean = false;

  testCases: TestCase[];
  dificultyFilter: number = 0;
  course: Course = null;
  valid: boolean = false;

  problemOld: Problem[] = [];
  problemNew: Problem[] = [];
  problems  : Problem[] = [];
  submit: Submit;

  isLoading: boolean;
  problemToched: Problem;
  isPast: boolean;

  form: FormGroup;
  fileToUpload: File = null;

  text: string = "Agregar Archivo";
  veredict = Veredict;

  language;
  ll = Language;

  students : User[] = [];

  list: Problem[];
  index: number;


  profesor: boolean = false;
  constructor(
    private dialog: MatDialog,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private problemService: ProblemService,
    private routerActivated: ActivatedRoute,
    private courseService: CourseService,
    private contestService: ContestService,
    private submitService: SubmitService,
    private userService: UserService,
    ){
      this.language = Object.keys(Language);

    }

  ngOnInit(): void {
    this.formCreate = this.fb.group({
      dateLimit:  ['', Validators.required],
      problem:  ['', Validators.required],
    });
    this.formCreate.get('problem').disable({onlySelf:true});

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



    this.routerActivated.parent.params.subscribe(params =>{
      let courseId = +params['id'];
       this.courseService.courseIn.subscribe(v => {
        if(this.valid) return;
         this.course = v.find(value => value.id == courseId);
         this.valid = this.course !== undefined;
         console.log(this.profesor);
         
         if(this.valid){
            this.contestService.getHomeworkById(this.course.contestId).subscribe(v =>{
              this.problems = [];
              console.log(v);
              
              v.forEach(element => {                
                let now: number = new Date(element.currentTime).valueOf();
                
                element.problem.limitDate = new Date(element.limitTime);

                this.problems.push(element.problem);
                if(element.problem.limitDate.valueOf() < now){
                  this.problemOld.push(element.problem);
                }
                else{
                  this.problemNew.push(element.problem);
                }
              });
            });
          }
      });
      
      this.courseService.courseOwn.subscribe(v => {
        let course = v.find(value => value.id == courseId);
        this.profesor = course !== undefined;
        if(this.valid) return;
        this.course = course;
        this.valid = this.course !== undefined;
        if(this.valid){
            this.contestService.getHomeworkById(this.course.contestId).subscribe(v =>{
              this.problems = [];
              console.log(v);

              v.forEach(element => {                
                let now: number = new Date(element.currentTime).valueOf();
                
                element.problem.limitDate = new Date(element.limitTime);

                this.problems.push(element.problem);
                if(element.problem.limitDate.valueOf() < now){
                  this.problemOld.push(element.problem);
                }
                else{
                  this.problemNew.push(element.problem);
                }
              });
            });
        }
     });
     
     this.courseService.getStudentsByCourseId(courseId).subscribe(v => {
      this.students = v;
      this.students.sort((a,b) =>{
        if(a.lastName.localeCompare(b.lastName) === 0)
          return a.firstName.localeCompare(b.firstName);
        return a.lastName.localeCompare(b.lastName);
      });
      });
    });

  }

  openAddProblemDialog(){
    this.dialogRef = this.dialog.open(this.addArticleDialog,  {
      width: '70vw',
      maxHeight: '80vh'
    });
  }

  onCreateHomework(){
    let x : Date = new Date(this.formCreate.get("dateLimit").value);
    let t : boolean[] = [];
    let find1 = this.problems.find(v => v.id === this.problem.id);

    if(find1 !== undefined){
      this.snackBar.open('Problema ya usado', "Cerrar", { duration: 2000,});
      return;
    }

    this.testCases.forEach(v => t.push(v.selected));
    this.contestService.addHomework(this.course.contestId, this.problem.id, x, t).subscribe(v =>{
      this.snackBar.open('Tarea añadida', "Cerrar", { duration: 2000,});
      this.problem.limitDate = x;
      this.problemNew.push(this.problem);
      this.problem = null;
      this.problemId = null;
      this.findProblem = false;
      this.dialogRef.close();
      this.formCreate.reset();
    },
    err =>{
      this.snackBar.open('Hubo un problema de al crear la tarea', "Cerrar", { duration: 2000,});
    }); 
  }

  searchProblem(problemId: number){
    this.problemService.getProblemById(problemId).subscribe(problem =>{
      let find1 = this.problems.find(v => v.id === problem.id);

      if(find1 !== undefined){
        this.snackBar.open('Problema ya usado', "Cerrar", { duration: 2000,});
        return;
      }
      this.problem = problem;
      this.findProblem = true;      
      this.formCreate.get('problem').setValue(this.problem.title);

      this.problemService.getProblemTCById(this.problem.id).subscribe(v =>{
        this.testCases = v;
        this.testCases.forEach(v => v.selected = true);
      },
      err => {
        this.snackBar.open('Hubo un error al traer los casos de prueba', "Cerrar", { duration: 2000,});
        this.testCases = null;
      });
    },
    err =>{
      this.snackBar.open('Problema no existe', "Cerrar", { duration: 2000,});
      this.findProblem = false;
      this.problem = null;
    });
  }

  onInputChange(event: MatSliderChange) {    
    this.testCases.forEach(value => value.selected = value.tcDifficulty <= event.value);
  }

  openHomeworkDialog(p: Problem, past: boolean){
    this.problemToched = p;
    this.isPast = past;
    this.submit = null;
    this.submitService.getLastSubmitAttempt(this.userService.getId(), this.course.contestId, p.id).subscribe(v => {
      this.submit = v;
    },
    err =>{
      this.submit = null;
    });
    this.dialogRef = this.dialog.open(this.homeworkView); 

  }

  openSendDialog(){
    this.dialogRef = this.dialog.open(this.submitView);
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
        this.course.contestId,
        this.problemToched.id,
        value,
        this.form.get('lang').value,
      ).subscribe(res => {
        this.snackBar.open('Envio hecho correctamente', "Cerrar", { duration: 3000, });

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

  openDialog(submit: Submit): void{
    const dialogRef = this.dialog.open(DialogSendComponent, {
      height: '85%',
      width: '80%',
      data: submit
    });
  }

  openGradesDialog(problem: Problem){    
    this.problemToched = problem;
    this.students.forEach(v =>{
      v.submit = null;
      this.courseService.getGradeFromStudent(v.id, this.course.contestId, problem.id).subscribe(x =>{
        v.submit = x.submit;
        v.submit.grade = x.grade;
      });
    });
    const dialogRef = this.dialog.open(this.gradesDialog, {
      maxHeight: '85vh',
      width: '80vw',
    });
  }

  saveGrades(){
    let studentsId: number[] = [];
    let grades: number[] = [];
    this.students.forEach(v => {
      studentsId.push(v.id);
      grades.push(v.submit.grade);
    });

    this.courseService.saveGrades(this.course.contestId, this.problemToched.id, studentsId, grades).subscribe(v =>{
      this.snackBar.open('Notas actualizadas correctamente', "Cerrar", { duration: 3000, });
    },
    err =>{
      this.snackBar.open('Hubo un error al actualizar las notas', "Cerrar", { duration: 3000, });
    });
  }

  openEditDialog(problem: Problem){
    this.problem = problem;
    this.formCreate.reset();
    let basura: string = "";
    basura += this.problem.limitDate.getFullYear() + "-";
    basura += (this.problem.limitDate.getMonth() <9? "0" + (this.problem.limitDate.getMonth()+1): this.problem.limitDate.getMonth()+1) + "-";
    basura += (this.problem.limitDate.getDate() <10? "0" + this.problem.limitDate.getDate(): this.problem.limitDate.getDate());
    basura += "T";
    basura += (this.problem.limitDate.getHours() <10? "0" + this.problem.limitDate.getHours(): this.problem.limitDate.getHours()) + ":";
    basura += (this.problem.limitDate.getMinutes() <10? "0" + this.problem.limitDate.getMinutes(): this.problem.limitDate.getMinutes());

    this.formCreate.get('dateLimit').setValue(basura);

    this.dialogRef = this.dialog.open(this.editHomework);
  }

  onEditHomework(){
    let x : Date = new Date(this.formCreate.get("dateLimit").value);

    console.log(this.course.contestId);
    
    this.courseService.editHomework(this.course.contestId, this.problem.id, x).subscribe(v => {
      this.snackBar.open('Tarea editada', "Cerrar", { duration: 2000,});
      this.problem.limitDate = x;
      this.problem = null;
      this.problemId = null;
      this.findProblem = false;
      this.dialogRef.close();
      this.formCreate.reset();
    },
    err =>{
      this.snackBar.open('Hubo un problema de al editar la tarea', "Cerrar", { duration: 2000,});
    });
  }

  openDeleteDialog(problem: Problem, list: Problem[], index: number){
    this.problem = problem;
    this.list = list;
    this.index = index;
    this.dialogRef = this.dialog.open(this.deleteHomeworkDialog);
  }

  deleteHomework(){

    this.courseService.removeHomework(this.course.contestId, this.problem.id).subscribe(v => {
      this.snackBar.open('Tarea eliminada correctamente', "Cerrar", { duration: 2000,});
      this.problem = null;
      this.problemId = null;
      this.findProblem = false;
      this.list.splice(this.index, 1);
      this.dialogRef.close();
      this.formCreate.reset();
    },
    err =>{
      this.snackBar.open('Hubo un problema de al eliminar la tarea', "Cerrar", { duration: 2000,});
    });
  }
}
