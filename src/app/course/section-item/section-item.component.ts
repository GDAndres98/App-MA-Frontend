import { Component, OnInit, Input } from '@angular/core';
import { Section } from 'src/app/model/section';

@Component({
  selector: 'app-section-item',
  templateUrl: './section-item.component.html',
  styleUrls: ['./section-item.component.css']
})
export class SectionItemComponent implements OnInit {

  @Input()
  public section: Section;
  constructor() { }

  ngOnInit(): void {
  }

}
