import { Component, OnInit } from '@angular/core';
import { Course } from '../../model/course';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import { CourseService } from '../../services/course/course.service';
import { StorageService } from '../../services/auth/storage.service';
import { Section } from '../../model/section';
import { DialogArticleComponent } from '../dialog-article/dialog-article.component';
import { Article } from 'src/app/model/article';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

  course: Course;
  sections: Section[];
  valid: boolean = false;
  isProfesor: boolean = false;
  constructor(
    private router: Router,
    private routerActivated: ActivatedRoute,
    private courseService: CourseService,
    private authService: StorageService) {
     }

  ngOnInit(): void {
    this.routerActivated.params.subscribe(params =>{
      let courseId = +params['id'];
       this.courseService.courseIn.subscribe(v => {
        if(this.valid) return;
         this.course = v.find(value => value.id == courseId);
         this.valid = this.course !== undefined;
         if(this.valid){
            this.courseService.getSectionFromCourse(this.course.id).subscribe(data => {
              data.sort((a,b) => a.orderSection-b.orderSection);
              this.sections = data;
            });
        }
      });
      
      this.courseService.courseOwn.subscribe(v => {
        let course = v.find(value => value.id == courseId);
        this.isProfesor = course !== undefined;
        if(this.valid) return;
        this.course = course;
        this.valid = this.course !== undefined;
        if(this.valid){
           this.courseService.getSectionFromCourse(this.course.id).subscribe(data => {
            data.sort((a,b) => a.orderSection-b.orderSection);
             this.sections = data;
           });
       }
     }); 
    });
  }


}
