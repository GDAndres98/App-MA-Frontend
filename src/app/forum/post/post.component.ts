import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from 'src/app/services/course/course.service';
import { MatDialog } from '@angular/material/dialog';
import { Post } from 'src/app/model/post';
import { Course } from 'src/app/model/course';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  notFound: boolean = false;

  course: Course;
  post: Post;
  repliesShowing: Post[];
  loaded = false;
  authors: Map<number, string>;
  collectionSize: number;
  pageNo: number;
  pageSize: number;


  constructor(
    private router: Router,
    private routerActive: ActivatedRoute,
    private courseService: CourseService,
    private dialog: MatDialog) {
    this.authors = new Map();
    this.pageNo = 1;
    this.pageSize = 5;
  }

  ngOnInit(): void {
    this.routerActive.parent.params.subscribe(parentParams => {
      let idCourse = +parentParams['id'];

      this.routerActive.params.subscribe(params => {
        let id = +params['id'];
        console.log(idCourse);
        console.log(id);
        this.courseService.getPostById(id).subscribe(data => {
          this.notFound = data.userCourse.id.courseId != idCourse;
          if (!this.notFound) {
            this.post = data;
            this.authors.set(data.userCourse.student.id, data.userCourse.student.firstName + " " + data.userCourse.student.lastName);
            data.author = this.authors.get(data.userCourse.student.id);
            this.onPageChange();
          }
        })
      })
    });
  }

  onPageChange() {

    if (!this.notFound) {
      this.courseService.getSubPostFromPost(this.post.id, this.pageNo - 1, this.pageSize).subscribe(replies => {
        this.repliesShowing = replies.content;
        this.collectionSize = replies.totalElements;
        this.repliesShowing.forEach(reply => {
          if (typeof reply.userCourse.student !== "number")
            this.authors.set(reply.userCourse.student.id, reply.userCourse.student.firstName + " " + reply.userCourse.student.lastName);
          reply.author = this.authors.get(reply.userCourse.id.studentId);
        });
        console.log(replies);
        this.loaded = true;
      })
    }
  }

}
