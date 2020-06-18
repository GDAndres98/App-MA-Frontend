import { Component, OnInit, OnChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
import { CourseService } from 'src/app/services/course/course.service';
import { Course } from 'src/app/model/course';
import { Post, PostToSubmit } from 'src/app/model/post';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  form: FormGroup;

  constructor(
    private router: Router,
    private routerActivated: ActivatedRoute,
    private courseService: CourseService,
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {

    this.authors = new Map();
    this.pageNo = 1;
    this.pageSize = 5;

  }

  ngOnInit(): void {
    this.form = new FormGroup({
      postTitle: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]),
      postContent: new FormControl('', Validators.compose([Validators.required, Validators.minLength(50), Validators.maxLength(2000)])),
    });


    if (!this.course) {
      this.routerActivated.parent.params.subscribe(params => {
        let courseId = +params['id'];
        this.courseService.courseIn.subscribe(v => {
          this.course = v.find(value => value.id == courseId);
          this.valid = this.course !== undefined;
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

  submitPost() {
    if (this.form.valid) {
      this.postToSubmit = new PostToSubmit();
      this.postToSubmit.studentId = this.userService.getId();
      this.postToSubmit.courseId = this.course.id;
      this.postToSubmit.title = this.form.get('postTitle').value;
      this.postToSubmit.content = this.form.get('postContent').value;
      this.courseService.createPost(this.postToSubmit).subscribe(
        value => {
          this.snackBar.open('Publicación creada satisfactoriamente', "Cerrar", { duration: 2000, });
          this.onPageChange();
        },
        err => this.snackBar.open(err.error, "Cerrar", { duration: 2000, })
      );
      console.log(this.postToSubmit);
    }
  }


}
