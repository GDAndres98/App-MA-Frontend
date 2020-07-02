import { Component, OnInit, Input } from '@angular/core';
import { Problem } from 'src/app/model/problem';
import { ActivatedRoute } from '@angular/router';
import { ProblemInContest, Contest } from 'src/app/model/contest';
import { ProblemService } from 'src/app/services/problem/problem.service';

@Component({
  selector: 'app-contest-problems',
  templateUrl: './contest-problems.component.html',
  styleUrls: ['./contest-problems.component.scss']
})
export class ContestProblemsComponent implements OnInit {


  @Input() index: number = 0;


  contest: Contest;
  problem: Problem;




  constructor(
    private problemService: ProblemService) { }

  ngOnInit(): void {

  }

  



  getProblem(): void {

  }


}
