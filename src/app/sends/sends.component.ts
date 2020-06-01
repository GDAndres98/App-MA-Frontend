import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-sends',
  templateUrl: './sends.component.html',
  styleUrls: ['./sends.component.css']
})
export class SendsComponent implements OnInit {
  myForm: FormGroup;
  myForm2: FormGroup;
  constructor() { }

  ngOnInit(): void {
  }

}
