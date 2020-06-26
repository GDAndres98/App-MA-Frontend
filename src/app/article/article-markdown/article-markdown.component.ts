import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from 'src/app/services/article/article.service';
import { Article } from 'src/app/model/article';

@Component({
  selector: 'app-article-markdown',
  templateUrl: './article-markdown.component.html',
  styleUrls: ['./article-markdown.component.css']
})
export class ArticleMarkdownComponent implements OnInit {

  @Input() public articleSelected: Article;

  constructor(private route: ActivatedRoute,
    private articleService: ArticleService) { }

  ngOnInit(): void {
  }

}
