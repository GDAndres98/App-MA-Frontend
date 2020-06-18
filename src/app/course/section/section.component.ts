import { Component, OnInit } from '@angular/core';
import { Section } from 'src/app/model/section';
import { Router, RouterLinkActive, ActivatedRoute } from '@angular/router';
import { CourseService } from 'src/app/services/course/course.service';
import { Article } from 'src/app/model/article';
import { MatDialog } from '@angular/material/dialog';
import { DialogArticleComponent } from '../dialog-article/dialog-article.component';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.css']
})
export class SectionComponent implements OnInit {

  public section: Section;
  constructor(
    private router: Router,
    private routerActive: ActivatedRoute,
    private courseService: CourseService,
    private dialog: MatDialog) {

 }

  ngOnInit(): void {
    this.routerActive.params.subscribe(params =>{
      let id = +params['id'];
      this.courseService.getSectionById(id).subscribe(data =>{
        this.section = data;
      })
    });
  }

  openDialog(article: Article): void{
    const dialogRef = this.dialog.open(DialogArticleComponent, {
      height: '85vh',
      data: article
    });
  }

}
