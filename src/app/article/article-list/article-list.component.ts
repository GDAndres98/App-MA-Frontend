import { Component, OnInit, OnChanges, Pipe, PipeTransform } from '@angular/core';
import { Article } from 'src/app/model/article';
import { ArticleService } from 'src/app/services/article/article.service';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map, debounceTime, tap, switchMap, finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Tag } from 'src/app/model/tag';
import { TagService } from 'src/app/services/tag/tag.service';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit {

  panelOpenState = false;

  allTags: Array<Tag>;
  filterForm: FormGroup;
  tagSearch: string;
  selectedTags: Array<Tag>;
  filteredTagsOptions: Array<Tag>;
  removable: boolean;
  filterControl = new FormControl();
  filteredByTags: boolean;
  expandedFilter: boolean;
  isLoadingFilter = false;



  articlesShowing: Array<Article>;
  collectionSize: number;
  pageNo: number;
  pageSize: number;
  sortBy: string;


  myControl = new FormControl();
  form: FormGroup;
  search: string;

  articleSelected: Article;

  isLoadingSearch = false;
  filteredArticles: Array<Article> = new Array();


  constructor(
    private arService: ArticleService,
    private tagService: TagService,
    private fb: FormBuilder,
    private router: Router) {
    this.pageNo = 1;
    this.pageSize = 7;
    this.sortBy = "title";

    this.removable = true;
    this.filteredByTags = false;
    this.selectedTags = new Array();
    this.allTags = new Array();
    this.expandedFilter = false;



    this.articlesShowing = new Array();
    this.onPageChange();
    this.getAllTags();
  }

  onPageChange() {
    this.isLoadingFilter = true;
    if (this.filteredByTags) {
      this.arService.getArticlesWithTags(this.pageNo - 1, this.pageSize, this.sortBy, this.selectedTags)
        .subscribe(allArticlesObs => {
          this.articlesShowing = allArticlesObs.content;
          this.collectionSize = allArticlesObs.totalElements;
          this.isLoadingFilter = false;
        }, () => {
          this.isLoadingFilter = false;
        });
    }
    else {
      this.arService.getAllArticlesPagination(this.pageNo - 1, this.pageSize, this.sortBy)
        .subscribe(allArticlesObs => {
          this.articlesShowing = allArticlesObs.content;
          this.collectionSize = allArticlesObs.totalElements;
          this.isLoadingFilter = false;
        }, () => {
          this.isLoadingFilter = false;
        });
    }
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      search: [''],
    });


    this.form
      .get('search')
      .valueChanges.pipe(
        debounceTime(300),
        tap(() => this.isLoadingSearch = true
        )).subscribe(value => {

          if (value && value.length >= 3) {
            this.arService.searchArticle(value).subscribe(arts => {
              this.filteredArticles = arts;
            }, err => { }, () => {
              this.isLoadingSearch = false;
            })
          }
          else {
            this.filteredArticles = [];
            this.isLoadingSearch = false;
          }
        })


    this.filterForm = this.fb.group({});
    this.filterControl.valueChanges.subscribe(
      value => {
        this.filteredTagsOptions = this._filter(value);
      })
  }

  private _filter(search: string): Tag[] {
    return this.allTags.filter(value => value.name.toLowerCase().includes(search.toLowerCase()));
  }


  getAllTags() {
    this.tagService.getAllTags().subscribe(data => this.allTags = data)
  }

  addFilterTag(ntag: Tag) {
    this.tagSearch = '';
    this.expandedFilter = true;
    let tag = ntag;
    this.allTags.some(e => {
      if (e.id === ntag.id) {
        tag = e;
        return true
      }
    });


    if (!this.selectedTags.includes(tag)) {
      this.selectedTags.push(tag);
      console.log(this.selectedTags);

      this.filteredByTags = true;
      this.pageNo = 1;
      this.onPageChange();
    }

  }

  removeFilterTag(tag: Tag): void {

    const index = this.selectedTags.indexOf(tag, 0);
    if (index > -1) {
      this.selectedTags.splice(index, 1);
    }
    console.log(this.selectedTags);
    if (this.selectedTags.length < 1)
      this.filteredByTags = false;
    this.pageNo = 1;
    this.onPageChange();
  }


  sendToArticle(article: Article) {
    this.router.navigateByUrl(`/article/${article.id}`);
  }
}

