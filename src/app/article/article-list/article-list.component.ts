import { Component, OnInit, OnChanges } from '@angular/core';
import { Article } from 'src/app/model/article';
import { ArticleService } from 'src/app/test-services/article.service';

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



  constructor(private arService: ArticleService) {
    this.pageNo = 1;
    this.pageSize = 6;
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


  ngOnInit(): void {
  }


}
