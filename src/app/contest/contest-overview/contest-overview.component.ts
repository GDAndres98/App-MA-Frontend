import { Component, OnInit, Input } from '@angular/core';
import { Problem } from 'src/app/model/problem';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contest-overview',
  templateUrl: './contest-overview.component.html',
  styleUrls: ['./contest-overview.component.css']
})
export class ContestOverviewComponent implements OnInit {


  problems: Problem[];
  lol: any;


  constructor(activatedRoute: ActivatedRoute) {


  }

  ngOnInit(): void {
  }

}
