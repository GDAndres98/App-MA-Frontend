import { Component, OnInit, Inject, NgModule } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Article } from 'src/app/model/article';
import { BauraComponent } from 'src/app/test/basura/baura/baura.component';

@Component({
  selector: 'app-dialog-article',
  templateUrl: './dialog-article.component.html',
  styleUrls: ['./dialog-article.component.css']
})

export class DialogArticleComponent implements OnInit {

  public data: Article;
  constructor(
    public dialogRef: MatDialogRef<DialogArticleComponent>,
    @Inject(MAT_DIALOG_DATA) public article: Article) {
      this.data = article;
    }
    
  ngOnInit(): void {
  }

}
