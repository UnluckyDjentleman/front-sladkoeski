import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { User } from '../constants/user';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isMobileMenuOpen = false;

  user!:User;
  isAdmin!: boolean;

  constructor(
    private router:Router,
    private userService: UserService,
    private authService: AuthService,
  ){}

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  ngOnInit():void{
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
  }

  navigateToProfile(){
    this.router.navigate(['/profile']);
  }

  signOut(){
    this.authService.signOut();
  }

  signIn(){
    this.router.navigate(['/auth']);
  }
}
