import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/model/article';
import { ArticleService } from 'src/app/test-services/article.service';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit {

  allArticles: Array<Article>;

  constructor(private arService: ArticleService) {
    this.allArticles = new Array();

    arService.getAllArticles().subscribe(allArticlesObs => {
      console.log(allArticlesObs);
      this.allArticles = allArticlesObs;
    }

    );

  }

  ngOnInit(): void {
  }

}
