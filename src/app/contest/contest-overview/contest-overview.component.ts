import { Component, OnInit, Input } from '@angular/core';
import { Problem } from 'src/app/model/problem';
import { ActivatedRoute } from '@angular/router';
import { ProblemInContest } from 'src/app/model/contest';

@Component({
  selector: 'app-contest-overview',
  templateUrl: './contest-overview.component.html',
  styleUrls: ['./contest-overview.component.css']
})
export class ContestOverviewComponent implements OnInit {


  problems: ProblemInContest[];


  constructor(activatedRoute: ActivatedRoute) {


  }

  ngOnInit(): void {
    this.problems.sort((a, b) => {
      if (a.letter > b.letter)
        return 1;
      if (a.letter < b.letter)
        return -1;
      return 0;
    });

    console.log(this.problems);
  }

}
