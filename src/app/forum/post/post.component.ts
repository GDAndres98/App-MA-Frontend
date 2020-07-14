import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from 'src/app/services/course/course.service';
import { MatDialog } from '@angular/material/dialog';
import { Post, PostToSubmit } from 'src/app/model/post';
import { Course } from 'src/app/model/course';
import { UserService } from 'src/app/services/user/user.service';
import { DialogPostComponent } from '../dialog-post/dialog-post.component';

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

  postToSubmit: PostToSubmit;

  constructor(
    private router: Router,
    private routerActivated: ActivatedRoute,
    private courseService: CourseService,
    private userService: UserService,
    private dialog: MatDialog) {

    this.postToSubmit = new PostToSubmit();


    this.authors = new Map();
    this.pageNo = 1;
    this.pageSize = 5;
  }

  ngOnInit(): void {
    this.routerActivated.parent.params.subscribe(parentParams => {
      let idCourse = +parentParams['id'];

      this.routerActivated.params.subscribe(params => {
        let id = +params['id'];
        this.courseService.getPostById(id).subscribe(data => {
          this.notFound = data.userCourse.id.courseId != idCourse;
          if (!this.notFound) {
            this.postToSubmit.courseId = idCourse;
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
        this.loaded = true;
      })
    }
  }


  openDialog(postToSubmit: PostToSubmit): void {
    postToSubmit.postId = this.post.id;
    postToSubmit.studentId = this.userService.getId();
    const dialogRef = this.dialog.open(DialogPostComponent, {
      data: postToSubmit
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.onPageChange();
        this.pageNo = 1;
      }
    });
  }


}
