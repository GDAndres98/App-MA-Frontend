import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Article } from 'src/app/model/article';
import { AdminService } from 'src/app/services/admin/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin-article',
  templateUrl: './admin-article.component.html',
  styleUrls: ['./admin-article.component.css']
})
export class AdminArticleComponent implements OnInit {

  formCreate: FormGroup;
  sourceCreate: string = "";

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private snackBar: MatSnackBar,
    ) { }

  ngOnInit(): void {
    this.formCreate = this.fb.group({
      title:  ['', Validators.required],
      author:  ['', Validators.required],
      source:  ['', Validators.required],
      date:  ['', Validators.required],
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

      this.adminService.createArticle(article, null).subscribe(
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

}
