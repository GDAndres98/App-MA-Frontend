import { Component, OnInit } from '@angular/core';
import { Level } from 'src/app/model/level';
import { LevelService } from 'src/app/services/level/level.service';

@Component({
  selector: 'app-level-list',
  templateUrl: './level-list.component.html',
  styleUrls: ['./level-list.component.css']
})
export class LevelListComponent implements OnInit {

  public levels:Level[];

  constructor(private levelService: LevelService) {
    
   }

  ngOnInit(): void {
    this.levelService.getAllLevels().subscribe(data=>{
      this.levels=data;
    });

  }

}
