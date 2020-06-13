import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Article } from 'src/app/model/article';
import { Tag } from 'src/app/model/tag';

@Component({
  selector: 'app-article-item',
  templateUrl: './article-item.component.html',
  styleUrls: ['./article-item.component.css']
})
export class ArticleItemComponent implements OnInit {

  @Input() mySelectedArticle: Article;
  @Output() clickOnTag = new EventEmitter<Tag>();
  
  constructor() { }

  ngOnInit(): void {
  }

  callParent(tag: Tag): void {
    this.clickOnTag.next(tag);
  }

}
