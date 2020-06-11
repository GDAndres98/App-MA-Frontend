import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { StorageService } from '../services/auth/storage.service';
import { Router, NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user/user.service';
import { Course } from '../model/course';
import { CourseService } from '../services/course/course.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  isLoggedIn$: Observable<boolean>;

  courseLoad$: Observable<Course[]>;
  courses: Course[];

  name$ : Observable<string>;
  name : string;
  state: string;
  constructor(
    private storageService: StorageService,
    private userService: UserService,
    private courseService: CourseService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.isLoggedIn$ = this.storageService.isLoggedIn;
    this.courseLoad$ = this.courseService.courseIn;
    this.name$ = this.userService.name;
    this.name$.subscribe(v =>{
      this.name = v;
    })

    this.courseLoad$.subscribe(c =>{
      this.courses = c;
    })

    this.router.events.subscribe(r =>{
      if(r instanceof NavigationEnd){
        this.state = this.router.url;
      }
    })
  }
  
  span(){
  }

  logout(){
    this.storageService.logout();
  }

}
