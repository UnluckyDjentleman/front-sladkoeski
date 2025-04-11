import { Component } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterOutlet } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { NavbarComponent } from './navbar/navbar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'front-slad';

  constructor(private router: Router) { }

  isAuthOrSignupRoute(): boolean {
    const route = this.router.routerState.snapshot.root;
    return this.isAuthRoute(route) || this.isSignupRoute(route);
  }

  isAuthRoute(route: ActivatedRouteSnapshot): boolean {
    if (route.firstChild)
      return this.isAuthRoute(route.firstChild);
    return route.routeConfig?.path === 'auth';
  }

  isSignupRoute(route: ActivatedRouteSnapshot): boolean {
    if (route.firstChild)
      return this.isSignupRoute(route.firstChild);
    return route.routeConfig?.path === 'signup';
  }
}
