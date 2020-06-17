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
      console.log("OPEN");
      
    }

  ngOnInit(): void {
    this.getArticle();
    console.log("OPEN");

  }

  getArticle(): void {
    if(!this.articleSelected){
      const id = +this.route.snapshot.paramMap.get('id');
      this.articleService.getArticleById(id).subscribe(article => {this.articleSelected = article;
        console.log(this.articleSelected);});
      }
  }

}
