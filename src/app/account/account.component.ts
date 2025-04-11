import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../constants/user';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import { Order } from '../constants/order';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-account',
  imports: [],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent {

  user!:User;
  isAdmin:boolean|undefined=false;
  orders!:Order[];

  constructor(
    private userService: UserService,
    private authService:AuthService,
    private httpClient: HttpClient
  ){

  }

  ngOnInit(){
    this.userService.getUserFromToken()
    .subscribe(
      (user: User) => {
        this.user = user;
        this.isAdmin = this.user.role==='Admin';
      },
      (error) => {
        if (error.status === 401) {
          this.authService.refreshToken();
        }
      }
    );

    this.fetchOrders();
  }

  fetchOrders(){
    this.httpClient.get<Order[]>(`${environment.serverPath}/orders/my-orders`).subscribe(
      (orders: Order[])=>this.orders=orders,
      (error)=>console.error(error)
    )
  }  

}
