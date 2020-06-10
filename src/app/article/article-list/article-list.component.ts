import { Component, OnInit, OnChanges, Pipe, PipeTransform } from '@angular/core';
import { Article } from 'src/app/model/article';
import { ArticleService } from 'src/app/test-services/article.service';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map, debounceTime, tap, switchMap, finalize } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit {

  allArticles: Array<Article>;
  collectionSize: number;
  pageNo: number;
  pageSize: number;
  sortBy: string;


  myControl = new FormControl();
  form: FormGroup;
  search: string;

  
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;

  articleSelected: Article;

  isLoading = false;
  filteredArticles: Array<Article> = new Array();
  

  constructor(
    private arService: ArticleService, 
    private fb: FormBuilder,
    private router: Router) {
    this.pageNo = 1;
    this.pageSize = 7;
    this.sortBy = "title";

    this.allArticles = new Array();
    this.onPageChange();
  }

  onPageChange() {
    this.arService.getAllArticlesPagination(this.pageNo - 1, this.pageSize, this.sortBy).subscribe(allArticlesObs => {
      this.allArticles = allArticlesObs.content;
      this.collectionSize = allArticlesObs.totalElements;
    }
    );
  }

  callService(){
    this.arService.searchArticle(this.form.get('search').value).subscribe(value =>{
      console.log(value);
    });
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      search: [''],
    });

    this.form
    .get('search')
    .valueChanges.pipe(
      debounceTime(300),
      tap(() => this.isLoading = true
      )).subscribe(value =>{
        
        if(value && value.length >= 3){ 
            this.arService.searchArticle(value).subscribe(arts =>{          
            this.filteredArticles = arts;
            
            },err =>{}, () =>{              
              this.isLoading = false;
            })
        }
        else{
          this.filteredArticles = [];
          this.isLoading = false;
        }
    })
  }

  sendToArticle(article: Article){

    this.router.navigateByUrl(`/article/${article.id}`);
  }

}

