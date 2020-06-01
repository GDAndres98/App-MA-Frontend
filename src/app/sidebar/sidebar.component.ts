import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { StorageService } from '../services/auth/storage.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  isLoggedIn$: Observable<boolean>;
  name$ : Observable<string>;
  name : string;
  constructor(
    private storageService: StorageService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.isLoggedIn$ = this.storageService.isLoggedIn;
    this.name$ = this.userService.name;
    this.name$.subscribe(v =>{
      this.name = v;
    })
  }
  
  span(){
  }

  logout(){
    this.storageService.logout();
  }

}
