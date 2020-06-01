import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth/auth.service';
import { StorageService } from '../services/auth/storage.service';
import { User } from '../model/User';
import { Session } from '../services/auth/Session';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  private formSubmitAttempt: boolean;

  constructor(
    private authService: AuthService, 
    private storageService: StorageService,
    private router: Router,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  
  isFieldInvalid(field: string) {
    return (
      (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.formSubmitAttempt)
    );
  }

  onSubmit() {
    if (this.form.valid) {
      this.authService.login(this.form.value).subscribe(value =>{
        if(value === null)
          console.log("ERROR: El usuario o la contraseña son erroneas");
        else{
          this.correctLogin(value);
        }
      });
    }
    this.formSubmitAttempt = true;
  }

  private correctLogin(data: User){
    let s: Session = new Session();
    s.token = "No se que agregar aquí";
    s.user = data;
    this.storageService.setCurrentSession(s);
    this.router.navigate(['/']);
  }

}
