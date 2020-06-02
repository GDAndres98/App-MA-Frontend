import { Component, Input, OnInit } from '@angular/core';
import { Article } from 'src/app/model/article';
import { TagItem } from 'src/app/model/tag';

@Component({
  selector: 'app-article-item',
  templateUrl: './article-item.component.html',
  styleUrls: ['./article-item.component.css']
})
export class ArticleItemComponent implements OnInit {

  @Input() mySelectedArticle: Article;


  constructor() {
  }

  ngOnInit(): void {
  }

}
