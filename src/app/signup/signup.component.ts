import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-signup',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  signUpForm!:FormGroup;

  constructor(
    private httpClient:HttpClient,
    private router:Router
  ){
    this.signUpForm=new FormGroup({
      'firstname':new FormControl(),
      'lastname':new FormControl(),
      'email':new FormControl(),
      'password':new FormControl()
    })
  }

  onSubmit(){
    const signUpForm=this.signUpForm.value;
    const signUpBody={
      email: this.signUpForm.get('email')?.value,
      password: this.signUpForm.get('password')?.value,
      name: this.signUpForm.get('firstname')?.value+' '+this.signUpForm.get('lastname')?.value
    }
    this.httpClient.post(`${environment.serverPath}/auth/signup`,signUpBody).subscribe(
          (response:any)=>{
            setTimeout(()=>{
              this.router.navigate(['/auth']);
            },400)
          },
          (error)=>console.error(error)
    )
  }

  onNavigateToAuth(){
    this.router.navigate(['/auth']).catch(error=>console.log(error))
  }
}
