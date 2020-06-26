import { Component, OnInit } from '@angular/core';
import { Problem } from 'src/app/model/problem';

@Component({
  selector: 'app-contest-problems',
  templateUrl: './contest-problems.component.html',
  styleUrls: ['./contest-problems.component.css']
})
export class ContestProblemsComponent implements OnInit {

  problems: Problem[];

  constructor() { }

  ngOnInit(): void {
  }

}
