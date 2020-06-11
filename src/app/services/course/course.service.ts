import { Injectable } from '@angular/core';
import { Course } from 'src/app/model/course';
import { BehaviorSubject } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

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
      this.courseIn.next(data);
    });
  }

  clearCourses() : void{
    this.courses = [];
    this.courseIn.next([]);
  }

}
