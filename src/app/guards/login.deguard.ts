import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from '../services/auth/auth.service';
import { StorageService } from '../services/auth/storage.service';

@Injectable()
export class AuthDeGuard implements CanActivate {
  constructor(private authService: AuthService, private storageService: StorageService, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.storageService.isAuthenticated()) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}