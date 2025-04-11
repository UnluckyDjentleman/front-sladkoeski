import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private httpClient: HttpClient,
    private router:Router
  ) { }

  getToken(): string|null{
    const token=localStorage.getItem('token');
    return token;
  }

  setToken(token:string){
    localStorage.setItem('token',token)
  }

  refreshToken(){
    const token=this.getToken()

    this.httpClient.post<{token:string}>(`${environment.serverPath}/auth/refresh`,{
      headers:{
        'Authorization':`Bearer ${token}`
      }
    }).subscribe(
      (res:{token:string})=>this.setToken(res.token),
      (error)=>console.error(error)
    )
  }

  signOut(){
    localStorage.removeItem('token');
    this.router.navigate(['/auth'])
  }
}
