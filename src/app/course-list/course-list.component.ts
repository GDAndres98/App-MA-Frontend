import { Component, OnInit } from '@angular/core';
import { CourseService } from '../services/course/course.service';
import { Course } from '../model/course';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {
  courses : Course[];
  coursesProfesor: Course[]
  constructor(private courseServices: CourseService) { 
    this.courseServices.courseIn.subscribe(data => this.courses = data);    
    this.courseServices.courseOwn.subscribe(data => this.coursesProfesor = data);    
  }

  ngOnInit(): void {
  }

}
