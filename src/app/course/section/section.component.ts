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
import { Problem } from 'src/app/model/problem';
import { ProblemService } from 'src/app/services/problem/problem.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.css']
})
export class SectionComponent implements OnInit {
  @ViewChild('addArticleDialog') addArticleDialog: TemplateRef<any>;
  @ViewChild('deleteArticleDialog') deleteArticleDialog: TemplateRef<any>;
  @ViewChild('addProblemDialog') addProblemDialog: TemplateRef<any>;
  @ViewChild('deleteProblemDialog') deleteProblemDialog: TemplateRef<any>;
  @ViewChild('problemDialog') problemDialog: TemplateRef<any>;



  dialogRef;

  idArticle: number = null;
  articleAdd: Article = null;
  findArticle: boolean = false;
  visible: boolean = false;

  courseId: number;
  profesor: boolean = false;

  articleSelected: Article;
  indexSelected: number;

  idProblem: number = null;
  problemAdd: Problem = null;
  findProblem: boolean = false;
  problemSelected: Problem;


  attachedEditVisible: boolean = false;
  phrases: string[] = [];
  phrasesEdit: string[] = [];
  phrasesEdit2: string[] = [];
  attached: string;
  addString: string;

  public section: Section;
  constructor(
    private router: Router,
    private routerActive: ActivatedRoute,
    private courseService: CourseService,
    private dialog: MatDialog,
    private articleService: ArticleService,
    private snackBar: MatSnackBar,
    private userService: UserService,
    private problemService: ProblemService,
    ) {

 }

  ngOnInit(): void {
    this.routerActive.params.subscribe(params =>{
      let id = +params['id'];
      this.courseService.getSectionById(id).subscribe(data =>{
        this.section = data;
        console.log(this.section);
        
        this.separatePhrases(this.section.attached);
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

  openAttachedEdit(){
    if(!this.attachedEditVisible){
      this.phrasesEdit = new Array();
      this.phrasesEdit2 = new Array();
      this.phrases.forEach(v =>{
        this.phrasesEdit.push(v);
        this.phrasesEdit2.push(v);
      });
      this.attachedEditVisible = true;
    }
    else
      this.attachedEditVisible = false;   
  }
  addPhrase(phase: string){
    if(!phase || phase.trim().length === 0) return;
    this.phrasesEdit.push(phase);
    this.phrasesEdit2.push(phase);
    this.addString = "";
  }

  separatePhrases(attached: string){
    if(!attached) return;
    attached = attached.trim();
    this.phrases = attached.split("\n");
    this.attached = "";
    this.phrases.forEach(v => this.attached += "- " + v + "\n\n");
  }
  deletePhase(i: number){
    this.phrasesEdit.splice(i,1);
    this.phrasesEdit2.splice(i,1);
  }

  saveAttached(){
    let a: string = "";
    this.phrasesEdit2.forEach(v => a += v + "\n");
    this.courseService.setSectionAttached(this.section.id, a).subscribe(v =>{
      this.section.attached = v;
      this.openAttachedEdit();
      this.separatePhrases(v);
      this.snackBar.open('Anexo actualizado', "Cerrar", { duration: 2000,});
    },
    err =>{
      this.snackBar.open('Hubo un error al actualizar', "Cerrar", { duration: 2000,});
    });
  }

  openRemoveProblemDialog(id: number){
    this.indexSelected = id;
    this.problemSelected = this.section.problems[id];
    this.dialogRef = this.dialog.open(this.deleteProblemDialog, {
    });
  }

  openDialogProblem(problem: Problem){
    this.problemSelected = problem;
    this.dialogRef = this.dialog.open(this.problemDialog, {
      height: '70vh'
    });
  }
  openAddProblemDialog(){
    this.dialogRef = this.dialog.open(this.addProblemDialog,  {
      width: '60vw',
    });
  }

  searchProblem(idProblem: number){
    this.problemService.getProblemById(idProblem).subscribe(problem =>{
      this.problemAdd = problem;
      this.findProblem= true;      
    },
    err =>{
      this.snackBar.open('Problema no existe', "Cerrar", { duration: 2000,});
      this.findProblem = false;
      this.problemAdd = null;
    });
  }


  addProblem(problemAdd: Problem){
    if(this.section.problems.find(v => v.id === problemAdd.id) !== undefined){
      this.snackBar.open('Problema ya esta en la sección', "Cerrar", { duration: 2000,});
      return;
    }
    this.courseService.addProblemToSection(this.section.id, this.problemAdd.id).subscribe(v =>{
      this.snackBar.open('Problema añadido exitosamente', "Cerrar", { duration: 2000,});
      this.section.problems.push(this.problemAdd);
      this.section.problems.sort((a,b) => a.title.localeCompare(b.title));
      this.dialogRef.close();
      this.problemAdd= null;
      this.idProblem = null;
      this.findProblem = false;
    },
    err =>{
      this.snackBar.open('Hubo un error al añadir el problema.', "Cerrar", { duration: 2000,});
    });
  }
  deleteProblem(){
    this.courseService.removeProblemToSection(this.section.id, this.problemSelected.id).subscribe(v => {
      this.dialogRef.close();
      this.snackBar.open('Problema removido exitosamente', "Cerrar", { duration: 2000,});
      this.section.problems.splice(this.indexSelected, 1);
    },
    err =>{
      this.snackBar.open('Hubo un error al intentar remover el problema', "Cerrar", { duration: 2000,});
    });
  }

  sendProblem(){
    this.dialogRef.close();
    this.router.navigateByUrl("/problem/" + this.problemSelected.id);
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.phrasesEdit, event.previousIndex, event.currentIndex);
    moveItemInArray(this.phrasesEdit2, event.previousIndex, event.currentIndex);

  }
}
