import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserLogin, User } from 'src/app/model/User';
import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn: boolean;
  constructor(private router: Router, private http: HttpClient) { }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  login(user: UserLogin): Observable<User>{
    if (user.userName !== '' && user.password !== '' ) {
      const body = new HttpParams()
      .set("username", user.userName + "")
      .set("password", user.password + "")

      console.log("HEE HEE ");  

      return this.http.post<User>(environment.urlvalidatedUser, body);
    }
  }

  setLogged(){
    this.loggedIn = true;
    this.router.navigate(['/']);
  }



  logout() {
    this.loggedIn = false;
    this.router.navigate(['/login']);
  }
  
}
