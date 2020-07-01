import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take, startWith } from 'rxjs/operators';
import { AuthService } from '../services/auth/auth.service';
import { StorageService } from '../services/auth/storage.service';
import { UserService } from '../services/user/user.service';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private storageService: StorageService,
    private router: Router,
    private userService: UserService) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>{
    console.log("ADMINGUARD");
    
      return this.userService.isAdmin(this.storageService.getCurrentUserId()).pipe(
        map(b =>{
          console.log(b);
          
          if(!b){
            this.router.navigate(['/login']);
            return false;
          }
          if(this.storageService.isAuthenticated()){
            return true;        
          }
          return false;
        }));
  }
}