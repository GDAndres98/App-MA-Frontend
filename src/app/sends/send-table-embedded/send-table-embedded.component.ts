import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Language, Veredict, Submit } from 'src/app/model/submit';
import { MatDialog } from '@angular/material/dialog';
import { SubmitService } from 'src/app/services/submit/submit.service';
import { UserService } from 'src/app/services/user/user.service';
import { DialogSendComponent } from '../dialog-send/dialog-send.component';

@Component({
  selector: 'app-send-table-embedded',
  templateUrl: './send-table-embedded.component.html',
  styleUrls: ['./send-table-embedded.component.css']
})
export class SendTableEmbeddedComponent implements OnInit {

  @Input("contestId")
  set contestId(contestId: number) {
    this._contestId = contestId;
    this.onPageChange();
  }
  _contestId:number;

  submitShowing: Array<Submit>;
  collectionSize: number;
  pageNo: number;
  pageSize: number;
  sortBy: string;
  isLoading = false;


  language = Language;
  veredict = Veredict;



  constructor(
    private submitService: SubmitService,
    private userService: UserService,
    private dialog: MatDialog) { 
    this.pageNo = 1;
    this.pageSize = 10;
    this.sortBy = "submitDate";    
    this.submitShowing = new Array();
    
  }
  ngOnInit(): void {
  }

  onPageChange() {
    this.isLoading = true;
    this.submitService.getSubmitsByUserContest(this.pageNo - 1, this.pageSize, this.sortBy, false, this.userService.getId(), this._contestId)
      .subscribe(submits => {
        this.submitShowing = submits.content;
        this.collectionSize = submits.totalElements;
        
        this.isLoading = false;
      }, () => {
        this.isLoading = false;
      });
  }

  openDialog(submit: Submit): void{
    const dialogRef = this.dialog.open(DialogSendComponent, {
      height: '85%',
      width: '80%',
      data: submit
    });
  }

}
