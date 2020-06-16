import { Component, OnInit, Input } from '@angular/core';
import { Problem } from 'src/app/model/problem';
import { ActivatedRoute } from '@angular/router';
import { ProblemService } from 'src/app/services/problem/problem.service';

@Component({
  selector: 'app-problem-detail',
  templateUrl: './problem-detail.component.html',
  styleUrls: ['./problem-detail.component.css']
})
export class ProblemDetailComponent implements OnInit {

  @Input() problem: Problem;

  constructor(private route: ActivatedRoute,
    private problemService: ProblemService) { }

  ngOnInit(): void {
    this.getProblem();
  }

  getProblem(): void {
    this.route.params.subscribe(params =>{
      let id = +params['id'];
      console.log(id);
      
      this.problemService.getProblemById(id).subscribe(problem => {
        this.problem = problem;
        console.log(problem);
      });
    })

  }


}
