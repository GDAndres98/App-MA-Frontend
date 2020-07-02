import { Component, OnInit } from '@angular/core';
import { Problem } from 'src/app/model/problem';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contest-problems',
  templateUrl: './contest-problems.component.html',
  styleUrls: ['./contest-problems.component.scss']
})
export class ContestProblemsComponent implements OnInit {

  problems: Problem[];


  numbers: Array<number>

  constructor() { }

  ngOnInit(): void {



    this.numbers = new Array<number>();
    for (let index = 0; index < 27; index++) {
      this.numbers.push(index)%10;
    }

    console.log(this.numbers);

  }



}
