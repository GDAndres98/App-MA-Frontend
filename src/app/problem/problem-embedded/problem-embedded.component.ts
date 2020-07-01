import { Component, OnInit, Input } from '@angular/core';
import { ProblemService } from 'src/app/services/problem/problem.service';
import { Problem } from 'src/app/model/problem';

@Component({
  selector: 'app-problem-embedded',
  templateUrl: './problem-embedded.component.html',
  styleUrls: ['./problem-embedded.component.css']
})
export class ProblemEmbeddedComponent implements OnInit {


  @Input() contestId: number=1;

  problem: Problem;

  constructor(
    private problemService: ProblemService) { }

  ngOnInit(): void {
  this.getProblem();
  }


  getProblem(): void {
    this.problemService.getProblemById(this.contestId).subscribe(problem => {
      this.problem = problem;
    });
  }

}
