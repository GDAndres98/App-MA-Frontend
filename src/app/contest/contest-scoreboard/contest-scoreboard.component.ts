import { Component, OnInit } from '@angular/core';
import { Contest, Scoreboard, ProblemScore, ProblemStats as ProblemStat } from 'src/app/model/contest';
import { ContestService } from 'src/app/services/contest/contest.service';

@Component({
  selector: 'app-contest-scoreboard',
  templateUrl: './contest-scoreboard.component.html',
  styleUrls: ['./contest-scoreboard.component.css']
})
export class ContestScoreboardComponent implements OnInit {

  contest: Contest;
  scoreboard: Scoreboard;
  scoreToProblem: Map<string, ProblemScore>;


  numbers: number[];


  constructor(
    private contestService: ContestService) {
    this.scoreToProblem = new Map();

    this.numbers = new Array<number>();
    for (let index = 0; index < 30; index++) {
      this.numbers.push(index);
    }

  }

  ngOnInit(): void {
    this.getScoreboard();
  }

  getScoreboard() {
    this.contestService.getScoreboard(this.contest.id).subscribe(data => {
      this.scoreboard = data;
      this.formatScoreboard();
    });
  }

  formatScoreboard() {
    
    this.scoreboard.stats.forEach(userS => {
      userS.problemsScore.forEach(problemS => {
        this.scoreToProblem.set(userS.id + "," + problemS.id, problemS);
      })
    });

  

    this.scoreboard.stats.sort((a, b) => {
      return a.position - b.position;
    });

  }

}
