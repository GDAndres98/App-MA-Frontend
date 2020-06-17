import { Component, OnInit, Input } from '@angular/core';
import { Section } from 'src/app/model/section';
import { Article } from 'src/app/model/article';
import { MatDialog } from '@angular/material/dialog';
import { DialogArticleComponent } from '../dialog-article/dialog-article.component';

@Component({
  selector: 'app-section-item',
  templateUrl: './section-item.component.html',
  styleUrls: ['./section-item.component.css']
})
export class SectionItemComponent implements OnInit {

  @Input()
  public section: Section;
  constructor(
    private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  
  openDialog(article: Article): void{
    const dialogRef = this.dialog.open(DialogArticleComponent, {
      height: '85vh',
      data: article
    });
  }

}
