import { Component, OnInit, Input } from '@angular/core';
import { ProblemService } from 'src/app/services/problem/problem.service';
import { Problem } from 'src/app/model/problem';
import { Contest } from 'src/app/model/contest';

@Component({
  selector: 'app-problem-embedded',
  templateUrl: './problem-embedded.component.html',
  styleUrls: ['./problem-embedded.component.css']
})
export class ProblemEmbeddedComponent implements OnInit {


  @Input() contest: Contest;
  @Input('index')
  set index(index: number) {
    this._index = index;
    this.getProblem();
  }

  _index: number = 0;
  problem: Problem;
  isLoading: boolean;

  constructor(
    private problemService: ProblemService) { }

  ngOnInit(): void {
    this.getProblem();
  }

  getProblem() {
    this.isLoading = true;
    this.problemService.getProblemById(this.contest.problems[this._index].id).subscribe(problem => {
      this.problem = problem;
      this.isLoading = false;
    });
  }





}
