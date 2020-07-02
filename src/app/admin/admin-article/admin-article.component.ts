import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Article } from 'src/app/model/article';
import { AdminService } from 'src/app/services/admin/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TagService } from 'src/app/services/tag/tag.service';
import { Tag } from 'src/app/model/tag';
import { from } from 'rxjs';
import { ArticleService } from 'src/app/services/article/article.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogArticleComponent } from 'src/app/course/dialog-article/dialog-article.component';

@Component({
  selector: 'app-admin-article',
  templateUrl: './admin-article.component.html',
  styleUrls: ['./admin-article.component.css']
})
export class AdminArticleComponent implements OnInit {
  @ViewChild('callAPIDialog') callAPIDialog: TemplateRef<any>;

  dialogRef;

  formCreate: FormGroup;
  sourceCreate: string = "";
  formEdit: FormGroup;
  sourceEdit: string;

  tags: Tag[] = [];
  tagsEdit: Tag[] = [];

  editId: number = null;
  findEdit: boolean = false;
  articleEdit: Article;

  delId : number = null;
  findDel: boolean = false;
  articleDel: Article;

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private snackBar: MatSnackBar,
    private tagService: TagService,
    private articleService: ArticleService,
    private dialog: MatDialog,
    ) { 
      this.tagService.getAllTags().subscribe(e => {
        this.tags = e;
        this.tagsEdit = e;
      });
    }

  ngOnInit(): void {
    this.formCreate = this.fb.group({
      title:  ['', Validators.required],
      author:  ['', Validators.required],
      source:  ['', Validators.required],
      date:  ['', Validators.required],
      tags:  ['', Validators.required],
    });

    this.formEdit= this.fb.group({
      title:  ['', Validators.required],
      author:  ['', Validators.required],
      source:  ['', Validators.required],
      date:  ['', Validators.required],
      tags:  ['', Validators.required],
    });
  }

  onCreateArticle(){
    if(this.formCreate.valid){
      let f = this.formCreate.value;
      let article: Article = new Article();
      article.title = f.title;
      article.author = f.author;
      article.markdown = f.source;
      article.dateWritten = f.date;
      article.tags = f.tags;
      
      
      this.adminService.createArticle(article, f.tags).subscribe(
        value =>{
          this.snackBar.open('Artículo creado satisfactoriamente', "Cerrar", { duration: 2000,});
          this.formCreate.reset();
        },
        err =>{
          this.snackBar.open('Hubo un error en la creación del artículo', "Cerrar", { duration: 2000,});
        }
      );
    }
  }

  onEditArticle(){
    if(this.formEdit.valid){
      let f = this.formEdit.value;
      this.articleEdit.title = f.title;
      this.articleEdit.author = f.author;
      this.articleEdit.markdown = f.source;
      this.articleEdit.dateWritten = f.date;
      this.articleEdit.tags = f.tags;
      
      this.adminService.editArticle(this.articleEdit, f.tags).subscribe(
        value =>{
          this.snackBar.open('Artículo Editado satisfactoriamente', "Cerrar", { duration: 2000,});
          this.formCreate.reset();
          this.findEdit = false;
        },
        err =>{
          this.snackBar.open('Hubo un error en la creación del artículo', "Cerrar", { duration: 2000,});
        }
      );
    }
  }

  searchEdit(editId: number){
    this.articleService.getArticleById(editId).subscribe(article =>{
      this.findEdit = true;
      this.articleEdit = article;
      this.articleEdit.dateWritten = new Date(this.articleEdit.dateWritten);
      let tags : Tag[] = new Array();
      this.tagsEdit.forEach(v =>{
        if(this.articleEdit.tags.find(x => x.id === v.id) !== undefined){
          tags.push(v);
        }
      });   

      this.formEdit= this.fb.group({
        title:    [this.articleEdit.title, Validators.required],
        author:   [this.articleEdit.author, Validators.required],
        source:   [this.articleEdit.markdown, Validators.required],
        date:     [this.articleEdit.dateWritten, Validators.required],
        tags:     [tags, Validators.required],
      });
      this.sourceEdit = this.articleEdit.markdown;
    },
    err =>{
      this.snackBar.open('Artículo no existe', "Cerrar", { duration: 2000,});
      this.findEdit = false;
    });
  }

  searchDel(delId: number){
    this.articleService.getArticleById(delId).subscribe(article =>{
      this.articleDel = article;
      this.findDel = true;      
    },
    err =>{
      this.snackBar.open('Artículo no existe', "Cerrar", { duration: 2000,});
      this.findDel = false;
      this.articleDel = null;
    });
  }

  openDeleteDialog(article: Article){
    this.dialogRef = this.dialog.open(DialogArticleComponent, {
      height: '85vh',
      data: article
    });
  }

  openConfirmDeleteDialog(){
    this.dialogRef = this.dialog.open(this.callAPIDialog);
  }

  deleteArticle(del: Article){
    this.adminService.deleteArticle(del).subscribe(v =>{
      this.snackBar.open('Articulo eliminado correctamente', "Cerrar", { duration: 2000,});
      this.findDel = false;
    },
    err =>{
      this.snackBar.open('Hubo un error en la creación del artículo', "Cerrar", { duration: 2000,});
    },
    () =>{
      this.dialogRef.close();
    });
  }


  

}
