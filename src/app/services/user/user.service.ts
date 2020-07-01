import { Injectable} from '@angular/core';
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
  id :BehaviorSubject<number> = new BehaviorSubject<number>(-1);
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
      this.updateMessage(user.id, user.firstName);
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

  getId(): number{   
    return this.currentUser.id; 
  }

  getName(): Observable<string> {
    return this.name.asObservable();
 }

 updateMessage(id: number, name: string) {
  this.name.next(name);
  this.id.next(id);
  }

  isAdmin(id: number): Observable<boolean>{
    if(id == null) return new BehaviorSubject<boolean>(false);
    let op = {headers: new HttpHeaders({ 'id': id + '' })};
    return this.http.get<boolean>(environment.urlIsAdmin, op);
  }

}
