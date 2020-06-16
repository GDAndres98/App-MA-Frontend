import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CourseService } from 'src/app/services/course/course.service';
import { Course } from 'src/app/model/course';
import { Post } from 'src/app/model/post';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  course: Course;
  valid: boolean = false;
  posts: Array<Post>;
  authors: Map<number, string>;

  constructor(
    private router: Router,
    private routerActivated: ActivatedRoute,
    private courseService: CourseService,) {
this.authors = new Map();


  }

  ngOnInit(): void {



    if (!this.course) {
      this.routerActivated.params.subscribe(params => {
        let courseId = +params['courseid'];
        this.courseService.courseIn.subscribe(v => {
          this.course = v.find(value => value.id == courseId);
          this.valid = this.course !== undefined;
          if (this.valid) {
            this.courseService.getPostsFromCourse(this.course.id).subscribe(data => {
              this.posts = data;
              this.posts.forEach(post => {
                if (typeof post.userCourse.student === "number")
                  post.author = this.authors.get(post.userCourse.student);
                else {
                  this.authors.set(post.userCourse.student.id, post.userCourse.student.firstName + " " + post.userCourse.student.lastName);
                  post.author = this.authors.get(post.userCourse.student.id);

                }

                  
              });
              console.log(this.authors);
            });
          }
        });
      });
    }
  }

}
