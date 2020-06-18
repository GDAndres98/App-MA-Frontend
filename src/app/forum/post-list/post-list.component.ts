import { Component, OnInit, OnChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
import { CourseService } from 'src/app/services/course/course.service';
import { Course } from 'src/app/model/course';
import { Post, PostToSubmit } from 'src/app/model/post';
import { DialogPostComponent } from '../dialog-post/dialog-post.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {



  course: Course;
  valid: boolean = false;
  postsShowing: Array<Post>;
  authors: Map<number, string>;
  collectionSize: number;
  pageNo: number;
  pageSize: number;
  sortBy: string;

  postToSubmit: PostToSubmit;


  constructor(
    private router: Router,
    private routerActivated: ActivatedRoute,
    private courseService: CourseService,
    private userService: UserService,
    private dialog: MatDialog
  ) {


    this.postToSubmit = new PostToSubmit();

    this.authors = new Map();
    this.pageNo = 1;
    this.pageSize = 5;

  }

  ngOnInit(): void {
    if (!this.course) {
      this.routerActivated.parent.params.subscribe(params => {
        let courseId = +params['id'];
        this.courseService.courseIn.subscribe(v => {
          this.course = v.find(value => value.id == courseId);
          this.valid = this.course !== undefined;
          this.postToSubmit.courseId = this.course.id;
          this.onPageChange();
        });
      });
    }
  }


  onPageChange() {
    if (this.valid) {
      this.courseService.getPostsFromCourse(this.course.id, this.pageNo - 1, this.pageSize).subscribe(data => {
        this.postsShowing = data.content;
        this.collectionSize = data.totalElements;
        this.postsShowing.forEach(post => {
          if (typeof post.userCourse.student !== "number")
            this.authors.set(post.userCourse.student.id, post.userCourse.student.firstName + " " + post.userCourse.student.lastName);
          post.author = this.authors.get(post.userCourse.id.studentId);
        });
      });
    }
  }

  openDialog(postToSubmit: PostToSubmit): void {
    postToSubmit.postId = -1;
    postToSubmit.studentId = this.userService.getId();
    const dialogRef = this.dialog.open(DialogPostComponent, {
      height: '85vh',
      data: postToSubmit
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.pageNo = 1;
        this.onPageChange();
      }
    });
  }


}
