import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/model/User';
import { AdminService } from 'src/app/services/admin/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Course } from 'src/app/model/course';
import { CourseService } from 'src/app/services/course/course.service';
import { UserService } from 'src/app/services/user/user.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-admin-courses',
  templateUrl: './admin-courses.component.html',
  styleUrls: ['./admin-courses.component.css']
})
export class AdminCoursesComponent implements OnInit {
  @ViewChild('dialogUserCourseView') dialogUserCourse: TemplateRef<any>;

  dialogRef;

  formCreate: FormGroup;
  logoCreate: string;
  profesorIdCreate: number;

  profesor: User = null;

  formEdit: FormGroup;
  logoEdit: string;
  profesorIdEdit: number;
  editId: number = null;
  findEdit: boolean = false;
  courseEdit: Course;

  editUserId: number = null;
  courseUserEdit: Course;
  findEditUser: boolean = false;

  students: User[] = [];
  studentId: number;
  findStudent: boolean = false;
  student: User;


  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private snackBar: MatSnackBar,
    private courseService: CourseService,
    private userService: UserService,
    private dialog: MatDialog,

  ) { }

  ngOnInit(): void {
    this.formCreate = this.fb.group({
      name:  ['', Validators.required],
      logo:  ['', Validators.required],
      profesor:  ['', Validators.required],
    });

    this.formEdit = this.fb.group({
      name:  ['', Validators.required],
      logo:  ['', Validators.required],
      profesor:  ['', Validators.required],
    });
  }


  onCreateCourse(){
    if(this.formCreate.valid){
      this.adminService.createCourse(
        this.formCreate.value.name,
        this.formCreate.value.logo,
        this.profesor).subscribe(v =>{
          this.snackBar.open('Curso creado correctamente', "Cerrar", { duration: 2000,});
          this.formCreate.reset();
          this.profesor = null;
          this.profesorIdCreate = null;
        },
        err =>{
          this.snackBar.open('Hubo un error al crear el curso', "Cerrar", { duration: 2000,});
        });
    }
  }
  searchProfessor(profesorIdCreate: number){
    this.adminService.getProfesorById(profesorIdCreate).subscribe(prof =>{
      this.profesor = prof;
      this.formCreate.get('profesor').setValue(this.profesor.firstName +  " " + this.profesor.lastName);
    },
    err =>{
      this.snackBar.open('Profesor no encontrado', "Cerrar", { duration: 2000,});
      this.profesor = null;
    });
  }

  clearformProfesor(form){
    this.profesor = null;
    form.get('profesor').setValue('');
  }

  searchEdit(editId: number){
    this.courseService.getCourseById(editId).subscribe(value =>{
      this.courseEdit = value;

      this.formEdit = this.fb.group({
        name:       [this.courseEdit.name, Validators.required],
        logo:       [this.courseEdit.logoUrl, Validators.required],
        profesor:   [this.courseEdit.professor, Validators.required],
      });
      this.profesor = this.courseEdit.professor;
      this.logoEdit = this.courseEdit.logoUrl;
      this.findEdit = true;
      this.profesorIdEdit = this.profesor.id;
    },
    err =>{
      this.snackBar.open('Curso no encontrado', "Cerrar", { duration: 2000,});
    })
  }
  onEditCourse(){
    if(this.formEdit.valid){
      this.adminService.updateCourse(
        this.formEdit.value.name,
        this.formEdit.value.logo,
        this.profesor,
        this.courseEdit.id
      ).subscribe(value =>{
        this.snackBar.open('Curso actualizado correctamente', "Cerrar", { duration: 2000,});

        this.formEdit.reset();
        this.profesor = null;
        this.courseEdit = null;
        this.findEdit = false;
        this.courseService.getUserCourses(this.userService.getId());
      },
      err =>{
        this.snackBar.open("Hubo un error al actualizar el curso", "Cerrar", { duration: 2000,});

      })
    }
  }

  openStudentsDialog(problemDel){
    this.courseService.getStudentsByCourseId(this.courseUserEdit.id).subscribe(st => this.students = st);
    this.dialogRef = this.dialog.open(this.dialogUserCourse,
      {
        height: '85vh',
        width: '85vw'
      });

  }


  searchEditUser(delId: number){
    this.courseService.getCourseById(delId).subscribe(value =>{
      this.courseUserEdit = value;
      this.findEditUser = true;
    },
    err =>{
      this.snackBar.open('Curso no encontrado', "Cerrar", { duration: 2000,});
    })
  }

  deleteStudent(index: number){
    let id = this.students[index].id;
    this.adminService.removeStudentToCourse(this.students[index].id, this.courseUserEdit.id).subscribe(
      v =>{
        this.snackBar.open('Estudiante removido correctamente. ID: '+ id, "Cerrar", { duration: 2000,});
        this.students.splice(index, 1);
      },
      err =>{
        this.snackBar.open('Hubo un error al remover al estudiante de la clase', "Cerrar", { duration: 2000,});
      }
    );
  }

  searchStudent(id: number){
    this.courseService.getStudentsById(id).subscribe(student =>{
      this.student = student;
      this.findStudent = true;
    },
    err =>{
      this.snackBar.open('El usuario no es un estudiante', "Cerrar", { duration: 2000,});
    });
  }

  addStudent(studentId: number){
    if(this.students.find(v => v.id === studentId) !== undefined){
      this.snackBar.open('El estudiante ya se encuentra en el curso', "Cerrar", { duration: 2000,});
      return;
    }

    //this.student = null;
    this.findStudent = false;

    this.adminService.addStudentToCourse(this.studentId, this.courseUserEdit.id).subscribe(v =>{
      this.snackBar.open('Estudiante añadido exitosamente', "Cerrar", { duration: 2000,});
      this.students.push(this.student);
    },
    err =>{
      this.snackBar.open('Hubo un error al añadir el estudiante', "Cerrar", { duration: 2000,});
    },
    () =>{
      this.student = null;
    });
    

  }


}
