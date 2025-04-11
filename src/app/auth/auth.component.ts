import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-auth',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {

  signInForm!:FormGroup;

  constructor(
    private httpClient: HttpClient,
    private router:Router,
    private authService:AuthService
  ){
    this.signInForm=new FormGroup({
      'email':new FormControl(),
      'password':new FormControl()
    })
  }

  onSubmit(){
    const signInForm=this.signInForm.value;
    this.httpClient.post<{token:string}>(`${environment.serverPath}/auth/signin`,signInForm).subscribe(
      (response:{token:string})=>{
        const token=response.token;
        this.authService.setToken(token);
        this.signInForm.reset();
        this.router.navigate(['/main']);
      },
      (error)=>console.error(error)
    )
  }

  onNavigateToSignup(){
    this.router.navigate([`/signup`])
  }
}
