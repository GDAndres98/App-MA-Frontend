import { Component, OnInit, Input } from '@angular/core';
import { Problem } from 'src/app/model/problem';
import { ActivatedRoute } from '@angular/router';
import { ProblemInContest, Contest } from 'src/app/model/contest';

@Component({
  selector: 'app-contest-overview',
  templateUrl: './contest-overview.component.html',
  styleUrls: ['./contest-overview.component.css']
})
export class ContestOverviewComponent implements OnInit {


  contest: Contest;


  constructor(activatedRoute: ActivatedRoute) {


  }

  ngOnInit(): void {
    console.log(this.contest);
    

  }

}
