import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from 'src/app/services/article/article.service';
import { Article } from 'src/app/model/article';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.css'],
})
export class ArticleDetailComponent implements OnInit {

  @Input() public articleSelected: Article;

  constructor(private route: ActivatedRoute,
    private articleService: ArticleService) { 
    }

  ngOnInit(): void {
    this.getArticle();
  }

  getArticle(): void {
    if(!this.articleSelected){
      const id = +this.route.snapshot.paramMap.get('id');
      this.articleService.getArticleById(id).subscribe(article => {this.articleSelected = article;
        });
      }
  }

}
