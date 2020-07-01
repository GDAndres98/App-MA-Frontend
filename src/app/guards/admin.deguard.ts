import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from '../services/auth/auth.service';
import { StorageService } from '../services/auth/storage.service';
import { UserService } from '../services/user/user.service';

@Injectable()
export class AdminDeGuard implements CanActivate {
  constructor(
    private authService: AuthService, 
    private storageService: StorageService, 
    private router: Router,
    private userService: UserService) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> | boolean {
    console.log("ADMINDEGUARD");
    if (this.storageService.isAuthenticated()){
      this.userService.isAdmin(this.storageService.getCurrentUser().id).subscribe(b =>{
        if(b)
          this.router.navigate(['/admin']);
        else
          this.router.navigate(['/']);
        return false;
      })      
    }
    console.log("here");
    
    return true;
  }
}