import {Injectable} from "@angular/core";
import { Router } from '@angular/router';
import { User } from 'src/app/model/User';
import { Session } from './Session';
import { BehaviorSubject } from 'rxjs';
import { UserService } from '../user/user.service';
import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment.prod';


@Injectable()
export class StorageService {

  private localStorageService;
  private currentSession : Session = null;
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);


  constructor(private router: Router, private userService: UserService) {
    this.localStorageService = localStorage;
    this.currentSession = this.loadSessionData();
    
  }

  setCurrentSession(session: Session): void {
    this.currentSession = session;
    this.loggedIn.next(true);
    this.userService.setUser(session.user);
    var encryted = CryptoJS.AES.encrypt(JSON.stringify(session), environment.hashCode);    
    this.localStorageService.setItem('currentUser', encryted.toString());
  }

  loadSessionData(): Session{
    var hash = this.localStorageService.getItem('currentUser');
    this.loggedIn.next(hash);    
    if(!hash) return null;
    var sessionStr = CryptoJS.AES.decrypt(hash, environment.hashCode).toString(CryptoJS.enc.Utf8);    
    if(sessionStr)
      this.userService.setUser(JSON.parse(sessionStr).user);
    return (sessionStr) ? <Session> JSON.parse(sessionStr) : null;
  }

  getCurrentSession(): Session {
    return this.currentSession;
  }

  removeCurrentSession(): void {
    this.localStorageService.removeItem('currentUser');
    this.currentSession = null;
    this.userService.setUser(null);
    
  }

  getCurrentUser(): User {
    var session: Session = this.getCurrentSession();
    return (session && session.user) ? session.user : null;
  };

  isAuthenticated(): boolean {
    return (this.getCurrentToken() != null) ? true : false;
  };

  getCurrentToken(): string {
    var session = this.getCurrentSession();
    return (session && session.token) ? session.token : null;
  };

  logout(): void{
    this.removeCurrentSession();
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }
  getCurrentUserId(): number{
      let user = this.getCurrentUser();
      return user === null? null: user.id;
  }

  
  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }


  

}