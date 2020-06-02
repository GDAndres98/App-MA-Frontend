import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth/auth.service';
import { StorageService } from '../services/auth/storage.service';
import { Router } from '@angular/router';
import { UserService } from '../services/user/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  private formSubmitAttempt: boolean;

  constructor(
    private userService: UserService, 
    private storageService: StorageService,
    private router: Router,
    private snackBar: MatSnackBar,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      firstName:  ['', Validators.required],
      lastName:   ['', Validators.required],
      userName:   ['', Validators.required],
      email:      ['', Validators.required],
      password:   ['', Validators.required],
      spassword:  ['', {validator: this.checkPassword}],
    }, {validator: this.checkIfMatchingPasswords('password', 'spassword')});
  }
  
  isFieldInvalid(field: string) {
    return (
      (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.formSubmitAttempt)
    );
  }

  checkIfMatchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
    return (group: FormGroup) => {
      let passwordInput = group.controls[passwordKey],
          passwordConfirmationInput = group.controls[passwordConfirmationKey];
      if (passwordInput.value !== passwordConfirmationInput.value) {
        return passwordConfirmationInput.setErrors({notEquivalent: true})
      }
      else {
          return passwordConfirmationInput.setErrors(null);
      }
    }
  }

  checkPassword(){
    let pass1 = this.form.get("password");
    let pass2 = this.form.get("spassword");

    return pass1 === pass2;
  }

  onSubmit() {
    if (this.form.valid) {
      this.userService.createStudent(this.form.value).subscribe(value =>{
          this.snackBar.open('Estudiante registrado satisfactoriamente', "Cerrar", { duration: 2000,});
          this.router.navigate(["/login"]);
          console.log(value);
      },
      err => {
        
        this.snackBar.open(err.error, "Cerrar", { duration: 2000,});
        //console.log(err);
      });
    }
    this.formSubmitAttempt = true;
  }
}
