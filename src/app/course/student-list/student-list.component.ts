import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin/admin.service';
import { User } from 'src/app/model/User';
import { CourseService } from 'src/app/services/course/course.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {

  students : User[] = [];
  courseId : number;

  constructor(
    private courseService: CourseService,
    private routerActivated: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.routerActivated.parent.params.subscribe(params =>{
      this.courseId = +params['id'];
      this.courseService.getStudentsByCourseId(this.courseId).subscribe(v => {
        this.students = v;
        this.students.sort((a,b) =>{
          if(a.lastName.localeCompare(b.lastName) === 0)
            return a.firstName.localeCompare(b.firstName);
          return a.lastName.localeCompare(b.lastName);
        });
      });
    });
  }
}
