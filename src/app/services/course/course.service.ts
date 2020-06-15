import { Injectable } from '@angular/core';
import { Course } from 'src/app/model/course';
import { BehaviorSubject } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/model/User';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  courses :Array<Course> = [];
  courseIn: BehaviorSubject<Course[]> = new BehaviorSubject<Course[]>([]);

  constructor(private http: HttpClient) { }


  getUserCourses(id: number): void{
    const op = {headers: new HttpHeaders({ 'id': id +''})};  
    
    this.http.get<Course[]>(environment.urlGetUserCourses, op).subscribe(data =>{
      this.courses = data;
      let map: Map<Number, User> = new Map();
      this.courses.forEach((v, index) =>{
        if(typeof v.professor == 'number')     
          this.courses[index].professor = map.get(v.professor);
        else        
          map.set(v.professor.id, v.professor);
      });
      this.courseIn.next(this.courses);
    });
  }

  clearCourses() : void{
    this.courses = [];
    this.courseIn.next([]);
  }

}
