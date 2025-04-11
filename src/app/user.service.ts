import { Injectable } from '@angular/core';
import { User } from './constants/user';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user!: User;
  isAdmin: boolean|undefined=false;

  constructor(
    private authService: AuthService,
    private httpClient:HttpClient
  ) { 

  }

  ngOnInit():void{
    this.isAdmin=this.user.role==='Admin'
  }

  getUserFromToken(): Observable<User> {
   const token=this.authService.getToken()

    if (!token)
      throw new Error('Token not found');

    const user=this.httpClient.get<User>(`${environment.serverPath}/users/me`,{headers:{
      'Authorization': `Bearer ${token}`
    }});
    return user;
  }

}
