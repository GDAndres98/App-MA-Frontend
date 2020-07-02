import { Component, OnInit, Input } from '@angular/core';
import { Problem } from 'src/app/model/problem';
import { ActivatedRoute } from '@angular/router';
import { ProblemInContest, Contest, ProblemStats } from 'src/app/model/contest';

@Component({
  selector: 'app-contest-overview',
  templateUrl: './contest-overview.component.html',
  styleUrls: ['./contest-overview.component.css']
})
export class ContestOverviewComponent implements OnInit {


  contest: Contest;
  stats: ProblemStats[];
  statsMap: Map<number, ProblemStats>;

  constructor(activatedRoute: ActivatedRoute) {
    this.statsMap = new Map();

  }

  ngOnInit(): void {
    this.stats.forEach(stat => {
      this.statsMap.set(stat.id, stat);
    })
    console.log(this.contest);
  }

}
