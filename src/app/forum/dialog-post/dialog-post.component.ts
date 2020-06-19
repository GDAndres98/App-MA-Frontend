import { Component, OnInit, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PostToSubmit } from 'src/app/model/post';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CourseService } from 'src/app/services/course/course.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EventEmitter } from 'protractor';

@Component({
  selector: 'app-dialog-post',
  templateUrl: './dialog-post.component.html',
  styleUrls: ['./dialog-post.component.css']
})
export class DialogPostComponent implements OnInit {

  public postToSubmit: PostToSubmit;
  public isReply: boolean;



  form: FormGroup;


  constructor(
    public courseService: CourseService,
    public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<DialogPostComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PostToSubmit) {
      this.postToSubmit = data;
  }

  ngOnInit(): void {
    this.isReply = this.data.postId >= 0;
    this.form = new FormGroup({
      postTitle: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]),
      postContent: new FormControl('', Validators.compose([Validators.required, Validators.minLength(50), Validators.maxLength(2000)])),
    });
  }



  submitPost() {
    this.postToSubmit.content = this.form.get('postContent').value;
    if (!this.isReply && this.form.valid) {
      this.postToSubmit.title = this.form.get('postTitle').value;


      this.courseService.createPost(this.postToSubmit).subscribe(
        value => {
          this.snackBar.open('Publicación creada satisfactoriamente', "Cerrar", { duration: 2000, });
          this.dialogRef.close(true);
        },
        err => this.snackBar.open(err.error, "Cerrar", { duration: 2000, })
      );
    }
    else if (this.isReply && this.form.get('postContent').valid) {
      this.postToSubmit.title = 'Reply';
      this.courseService.createSubPost(this.postToSubmit).subscribe(
        value => {
          this.snackBar.open('Respuesta publicada satisfactoriamente', "Cerrar", { duration: 2000, });
          this.dialogRef.close(true);
        },
        err => this.snackBar.open(err.error, "Cerrar", { duration: 2000, })
      );
    }
    console.log(this.postToSubmit);
  }
}
