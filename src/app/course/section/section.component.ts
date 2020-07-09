import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Section } from 'src/app/model/section';
import { Router, RouterLinkActive, ActivatedRoute } from '@angular/router';
import { CourseService } from 'src/app/services/course/course.service';
import { Article } from 'src/app/model/article';
import { MatDialog } from '@angular/material/dialog';
import { DialogArticleComponent } from '../dialog-article/dialog-article.component';
import { ArticleService } from 'src/app/services/article/article.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.css']
})
export class SectionComponent implements OnInit {
  @ViewChild('addArticleDialog') addArticleDialog: TemplateRef<any>;
  @ViewChild('deleteArticleDialog') deleteArticleDialog: TemplateRef<any>;


  dialogRef;

  idArticle: number = null;
  articleAdd: Article = null;
  findArticle: boolean = false;
  visible: boolean = false;

  courseId: number;
  profesor: boolean = false;

  articleSelected: Article;
  indexSelected: number;

  public section: Section;
  constructor(
    private router: Router,
    private routerActive: ActivatedRoute,
    private courseService: CourseService,
    private dialog: MatDialog,
    private articleService: ArticleService,
    private snackBar: MatSnackBar,
    private userService: UserService,
    ) {

 }

  ngOnInit(): void {
    this.routerActive.params.subscribe(params =>{
      let id = +params['id'];
      this.courseService.getSectionById(id).subscribe(data =>{
        this.section = data;
      })
    });
    this.routerActive.parent.params.subscribe(params =>{
      this.courseId = +params['id'];
      this.courseService.hasCoursePermision(this.courseId, this.userService.getId()).subscribe( v => this.profesor = v);
    });
  }

  openDialog(article: Article): void{
    const dialogRef = this.dialog.open(DialogArticleComponent, {
      height: '85vh',
      data: article
    });
  }

  openAddArticleDialog(){
    this.dialogRef = this.dialog.open(this.addArticleDialog,  {
      width: '60vw'
    });
  }

  searchArticle(idArticle: number){
    this.articleService.getArticleById(idArticle).subscribe(article =>{
      this.articleAdd = article;
      this.findArticle = true;      
    },
    err =>{
      this.snackBar.open('Artículo no existe', "Cerrar", { duration: 2000,});
      this.findArticle = false;
      this.articleAdd = null;
    });
  }
  switchVisible(){
    this.visible = !this.visible;
  }

  addArticle(articleAdd: Article){
    if(this.section.articles.find(v => v.id === articleAdd.id) !== undefined){
      this.snackBar.open('Artículo ya esta en la sección', "Cerrar", { duration: 2000,});
      return;
    }
    this.courseService.addArticleToSection(this.section.id, this.articleAdd.id).subscribe(v =>{
      this.snackBar.open('Artículo añadido exitosamente', "Cerrar", { duration: 2000,});
      this.section.articles.push(this.articleAdd);
      this.section.articles.sort((a,b) => a.title.localeCompare(b.title));
      this.dialogRef.close();
      this.articleAdd = null;
      this.idArticle = null;
      this.findArticle = false;
    },
    err =>{
      this.snackBar.open('Hubo un error al añadir el articulo.', "Cerrar", { duration: 2000,});
    });
  }

  deleteArticle(){
    this.courseService.removeArticleToSection(this.section.id, this.articleSelected.id).subscribe(v => {
      this.dialogRef.close();
      this.snackBar.open('Artículo removido exitosamente', "Cerrar", { duration: 2000,});
      this.section.articles.splice(this.indexSelected, 1);
    },
    err =>{
      this.snackBar.open('Hubo un error al intentar remover el artículo', "Cerrar", { duration: 2000,});
    });
  }
  openRemoveArticleDialog(id: number){
    this.indexSelected = id;
    this.articleSelected = this.section.articles[id];
    this.dialogRef = this.dialog.open(this.deleteArticleDialog, {
    });
  }

}
