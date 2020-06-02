import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-sends',
  templateUrl: './sends.component.html',
  styleUrls: ['./sends.component.css']
})
export class SendsComponent implements OnInit {
  myForm2: FormGroup = new FormGroup({Search: new FormControl()});
  constructor() { }

  ngOnInit(): void {
  }

}
