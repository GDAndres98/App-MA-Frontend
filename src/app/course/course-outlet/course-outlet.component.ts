import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CourseService } from 'src/app/services/course/course.service';
import { StorageService } from 'src/app/services/auth/storage.service';
import { Course } from 'src/app/model/course';

@Component({
  selector: 'app-course-outlet',
  templateUrl: './course-outlet.component.html',
  styleUrls: ['./course-outlet.component.css']
})
export class CourseOutletComponent implements OnInit {
  
  course: Course;
  valid: boolean = false;
  constructor(
    private router: Router,
    private routerActivated: ActivatedRoute,
    private courseService: CourseService,
    private authService: StorageService) {}


  ngOnInit(): void {
    this.routerActivated.params.subscribe(params =>{
      let courseId = +params['id'];
       this.courseService.courseIn.subscribe(v => {
         this.course = v.find(value => value.id == courseId);
         this.valid  = this.course !== undefined;
      });
    });
  }


}
