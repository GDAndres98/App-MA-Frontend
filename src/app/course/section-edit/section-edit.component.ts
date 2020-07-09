import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CourseService } from 'src/app/services/course/course.service';
import { UserService } from 'src/app/services/user/user.service';
import { Section } from 'src/app/model/section';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-section-edit',
  templateUrl: './section-edit.component.html',
  styleUrls: ['./section-edit.component.css']
})
export class SectionEditComponent implements OnInit {
  @ViewChild('createSectionDialog') dialogCreateSection: TemplateRef<any>;
  @ViewChild('editSectionDialog')   dialogEditSection: TemplateRef<any>;
  @ViewChild('deleteSectionDialog') dialogDeleteSection: TemplateRef<any>;

  dialogRef;

  sections : Section[] = [];
  formCreate: FormGroup;
  formEdit: FormGroup;
  
  sectionSelected: Section;
  indexSelected: number;

  courseId: number;
  orderAffected: boolean = false;

  
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private routerActivated: ActivatedRoute,
    private courseService: CourseService,
    private userService: UserService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.formCreate = this.fb.group({
      title:  ['', Validators.required],
      description:  [''],
    });

    this.formEdit = this.fb.group({
      title:  ['', Validators.required],
      description:  [''],
    });

    this.routerActivated.parent.params.subscribe(params =>{
      this.courseId = +params['id'];
      this.courseService.hasCoursePermision(this.courseId, this.userService.getId()).subscribe( v =>{
        if(!v) this.router.navigate(["../"], { relativeTo: this.routerActivated });
      });
      this.courseService.getSectionFromCourse(this.courseId).subscribe(v => {
        v.sort((a,b) => a.orderSection-b.orderSection);
        this.sections = v;
      });
    });
  }

  drop(event: CdkDragDrop<Section[]>) {
    this.orderAffected = true;
    moveItemInArray(this.sections, event.previousIndex, event.currentIndex);
  }

  openCreateDialog(){
    this.dialogRef = this.dialog.open(this.dialogCreateSection,  {
      width: '85vw'
    });
  }

  openEditDialog(index: number){
    this.sectionSelected = this.sections[index];
    this.indexSelected = index;
    this.formEdit = this.fb.group({
      title:  [this.sectionSelected.title, Validators.required],
      description:  [this.sectionSelected.description],
    });

    this.dialogRef = this.dialog.open(this.dialogEditSection,  {
      width: '85vw'
    });
  }

  updateOrder(){
    let orderIds: number[] = [];
    this.sections.forEach(v => orderIds.push(v.id));
    this.courseService.setOrderSection(orderIds).subscribe(v =>{
      this.snackBar.open('Orden actualizado', "Cerrar", { duration: 2000,});
      this.sections.forEach((v,i) => v.orderSection = i);
      this.orderAffected = false;
    },
    err => {
      this.snackBar.open('Hubo un error al actualizar el orden', "Cerrar", { duration: 2000,});
    });
  }

  onCreateSection(){
    if(this.formCreate.valid){
      let createSection: Section = new Section();

      createSection.title = this.formCreate.value.title;
      createSection.description = this.formCreate.value.description;
      let max : number = 0;
      this.sections.forEach(v => max = Math.max(max, v.orderSection));
      createSection.orderSection = max + 1;

      this.courseService.createSection(createSection, this.courseId).subscribe(v =>{
        createSection = v;
        this.sections.push(createSection);
        this.snackBar.open('Sección creada correctamente', "Cerrar", { duration: 2000,});
        this.dialogRef.close();
      },
      err =>{
        this.snackBar.open('Hubo un error al intentar crear la sección', "Cerrar", { duration: 2000,});
      });
    }
  }

  onEditSection(){
    if(this.formEdit.valid){

      this.sectionSelected.title = this.formEdit.value.title;
      this.sectionSelected.description = this.formEdit.value.description;

      console.log(this.sectionSelected.id);
      

      this.courseService.editSection(this.sectionSelected).subscribe(v =>{
        this.sections[this.indexSelected] = v;
        this.formEdit.reset();
        this.indexSelected = -1;
        this.sectionSelected = null;
        this.snackBar.open('Sección actualizada correctamente', "Cerrar", { duration: 2000,});
        this.dialogRef.close();
      },
      err =>{
        this.snackBar.open('Hubo un error al intentar actualizar la sección', "Cerrar", { duration: 2000,});
      });
    }
  }

  openDeleteDialog(index: number){
    this.sectionSelected = this.sections[index];
    this.indexSelected = index;

    this.dialogRef = this.dialog.open(this.dialogDeleteSection,  {
    });
  }

  deleteProblem(){
    this.courseService.deleteSection(this.sectionSelected).subscribe(v =>{
      this.sections.splice(this.indexSelected, 1);
      this.indexSelected = -1;
      this.dialogRef.close();
      //this.sectionSelected = null;
      this.snackBar.open('Sección eliminada correctamente', "Cerrar", { duration: 2000,});
    },
    err =>{
      this.snackBar.open('Hubo un error al intentar eliminar la sección', "Cerrar", { duration: 2000,});
    });

  }
  
}
