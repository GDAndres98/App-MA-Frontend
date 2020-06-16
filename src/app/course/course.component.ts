import { Component, OnInit } from '@angular/core';
import { Course } from '../model/course';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user/user.service';
import { CourseService } from '../services/course/course.service';
import { StorageService } from '../services/auth/storage.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

  course: Course;
  valid: boolean = false;
  constructor(
    private router: Router,
    private routerActivated: ActivatedRoute,
    private courseService: CourseService,
    private authService: StorageService) { }

  ngOnInit(): void {
    let courseId = +this.routerActivated.snapshot.paramMap.get('id');
    this.valid = this.courseService.hasCourse(courseId);
    console.log("ENTRO" + this.valid + "id: " + courseId);
    console.log(this.courseService.courses);
    console.log(this.authService.getCurrentUser());
    
    
    if(this.valid){  
         
      this.course = this.courseService.getCourse(courseId);
    }
  }

}
