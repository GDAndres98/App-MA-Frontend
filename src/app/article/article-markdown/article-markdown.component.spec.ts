import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleMarkdownComponent } from './article-markdown.component';

describe('ArticleMarkdownComponent', () => {
  let component: ArticleMarkdownComponent;
  let fixture: ComponentFixture<ArticleMarkdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticleMarkdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleMarkdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
