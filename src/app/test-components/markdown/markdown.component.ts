import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-markdown',
  templateUrl: './markdown.component.html',
  styleUrls: ['./markdown.component.css']
})
export class MarkdownComponent implements OnInit, OnDestroy {

  private sub: Subscription;

  post: string;
  markdown = `## Markdown __rulez__!
---

### Syntax highlight
\`\`\`typescript
const language = 'typescript';
\`\`\`

### Lists
1. Ordered lig
2. Another bullet point
  - Unordered list
  - Another unordered bullet point

### Blockquote
> Blockquote to the max`;

  constructor(private http:HttpClient) {
    
  }

  async ngOnInit() {
    
    this.post = await this.http.get(`/assets/problems/problem1.md`, { responseType: 'text'}).toPromise();
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

}
