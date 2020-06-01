import { Injectable } from '@angular/core';
import { User } from 'src/app/model/User';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  currentUser: User;
  name :BehaviorSubject<string> = new BehaviorSubject<string>("");

  constructor() { }

  setUser(user: User){
    this.currentUser = user;
    if(user){
      console.log(user.firstName);
      this.updateMessage(user.firstName);
    }
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
