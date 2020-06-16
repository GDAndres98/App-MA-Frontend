import { Injectable } from '@angular/core';
import { User, UserLogin } from 'src/app/model/User';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpParams, HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CourseService } from '../course/course.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  currentUser: User;
  name :BehaviorSubject<string> = new BehaviorSubject<string>("");

  constructor(
    private http: HttpClient,
    private courseService: CourseService
    ) { }

  setUser(user: User){
    this.currentUser = user;    
    if(user){
      this.courseService.getUserCourses(this.currentUser.id);
      console.log(user.firstName);
      this.updateMessage(user.firstName);
    }
    else{
      this.courseService.clearCourses();
    }
  }

  createStudent(user: UserLogin){
    const body = new HttpParams()
    .set("firstName", user.firstName.trim() + "")
    .set("lastName", user.lastName.trim() + "")
    .set("username", user.userName.trim() + "")
    .set("email", user.email.trim() + "")
    .set("password", user.password.trim() + "")
    .set("profilePic", "ESTO SE VA A BORRAR.jpg");
  
    //console.log("HEE HEE ");  

    return this.http.post(environment.urlStudentCreation, body, {responseType: 'text'});
  }

  getUser(): User{   
    return this.currentUser; 
  }

  getName(): Observable<string> {
    return this.name.asObservable();
 }

 updateMessage(name: string) {
  this.name.next(name);
}

}
