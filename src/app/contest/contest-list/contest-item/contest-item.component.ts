import { Component, OnInit, Input } from '@angular/core';
import { ContestPreview } from 'src/app/model/contest';

@Component({
  selector: 'app-contest-item',
  templateUrl: './contest-item.component.html',
  styleUrls: ['./contest-item.component.css']
})
export class ContestItemComponent implements OnInit {

  @Input() contest: ContestPreview;

  contestLength: number;

  contestStatus: number; // 0 sin empezar, 1 Corriendo, 2 Terminada
  time: number;
  timeDisplayed: number;
  maxTime: number;
  interval;


  constructor() { }

  ngOnInit(): void {
    this.contest.startTime = new Date(this.contest.startTime);
    this.contest.endTime = new Date(this.contest.endTime);
    this.contestLength = this.contest.endTime.getTime() - this.contest.startTime.getTime();
    this.maxTime = (this.contest.endTime.getTime() - this.contest.startTime.getTime());
    this.startTimer();
  }

  startTimer() {
    this.getCurrentTime();
    this.interval = setInterval(() => {
      this.getCurrentTime();
    }, 1000);
  }

  getCurrentTime() {
    this.time = ((new Date()).getTime() - this.contest.startTime.getTime());
    if (this.time < 0) {
      this.contestStatus = 0;
      this.timeDisplayed = Math.abs(this.time);
    }
    else if (this.time >= this.maxTime) {
      this.contestStatus = 2;
      this.timeDisplayed = this.maxTime;
    }
    else {
      this.contestStatus = 1;
      this.timeDisplayed = this.maxTime - this.time;
    }
  }

}
