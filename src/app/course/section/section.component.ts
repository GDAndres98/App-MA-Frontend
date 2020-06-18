import { Component, OnInit } from '@angular/core';
import { Section } from 'src/app/model/section';
import { Router, RouterLinkActive, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.css']
})
export class SectionComponent implements OnInit {

  public section: Section;
  constructor(router: Router, routerActive: ActivatedRoute) {
    
 }

  ngOnInit(): void {

  }

}
