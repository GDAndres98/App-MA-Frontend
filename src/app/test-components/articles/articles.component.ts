import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/model/article';
import { ArticleService } from 'src/app/test-services/article.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {

  allArticles: Array<Article>;

  constructor(private arService: ArticleService) {
    this.allArticles = new Array();

    arService.getAllTweets().subscribe(allArticlesObs => {
      console.log(allArticlesObs);
      this.allArticles = allArticlesObs;
    }

    );

  }

  ngOnInit(): void {
  }

}
