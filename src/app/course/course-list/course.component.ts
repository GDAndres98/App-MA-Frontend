import { Component, OnInit } from '@angular/core';
import { Course } from '../../model/course';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import { CourseService } from '../../services/course/course.service';
import { StorageService } from '../../services/auth/storage.service';
import { Section } from '../../model/section';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

  course: Course;
  sections: Section[];
  valid: boolean = false;
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
         this.course = v.find(value => value.id == courseId);
         this.valid = this.course !== undefined;
         if(this.valid){
            this.courseService.getSectionFromCourse(this.course.id).subscribe(data => {
              this.sections = data;
              console.log(data);
            });
        }
      });
    });
  }

}
