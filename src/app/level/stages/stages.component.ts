import { Component, OnInit } from '@angular/core';
import { LevelService } from 'src/app/services/level/level.service';
import { Stage } from 'src/app/model/level';

@Component({
  selector: 'app-stages',
  templateUrl: './stages.component.html',
  styleUrls: ['./stages.component.css']
})
export class StagesComponent implements OnInit {

  public stages1: Stage[]
  public stages2: Stage[]
  public stages3: Stage[]


  constructor(public levelService: LevelService) {
    this.stages1 = Array<Stage>();
    this.stages2 = Array<Stage>();
    this.stages3 = Array<Stage>();

  }

  ngOnInit(): void {
    this.levelService.getAllStages().subscribe(data => {
      data.forEach(stage => {
        switch (stage.number) {
          case 1:
            this.stages1.push(stage);
            break;
          case 2:
            this.stages2.push(stage);
            break;
          case 3:
            this.stages3.push(stage);
            break;
          default:
            break;
        }
      });
    });
  }



}
