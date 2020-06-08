import { Component, OnInit, Input } from '@angular/core';
import { Article } from 'src/app/model/article';

@Component({
  selector: 'app-article-item',
  templateUrl: './article-item.component.html',
  styleUrls: ['./article-item.component.css']
})
export class ArticleItemComponent implements OnInit {

  @Input() mySelectedArticle: Article;
  
  constructor() { }

  ngOnInit(): void {
  }

}
