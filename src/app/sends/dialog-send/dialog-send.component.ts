import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Submit, Language, Veredict, LanguageSyntax } from 'src/app/model/submit';
import { SubmitService } from 'src/app/services/submit/submit.service';


@Component({
  selector: 'app-dialog-send',
  templateUrl: './dialog-send.component.html',
  styleUrls: ['./dialog-send.component.css']
})
export class DialogSendComponent implements OnInit {

  public submit: Submit;
  public code: string = "";

  language = Language;
  veredict = Veredict;
  languageSyntax = LanguageSyntax;


  constructor( 
    public dialogRef: MatDialogRef<DialogSendComponent>,
    @Inject(MAT_DIALOG_DATA) public sub: Submit,
    private submitService: SubmitService) {
      this.submit = sub;
      this.submitService.getSourceCode(this.submit.id).subscribe(source => this.code = source);
    }

  ngOnInit(): void {
  }

}
