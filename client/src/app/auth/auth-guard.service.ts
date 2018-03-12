import { CanActivate, CanLoad, ActivatedRouteSnapshot, RouterStateSnapshot, Route, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {
    constructor(private authService: AuthService, private router: Router) { }

    isLoggedIn() {
        const isAuthenticated = this.authService.isAuthenticated();

        if (!isAuthenticated) {
            this.router.navigate(['/login']);
        }

        return isAuthenticated;
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this.isLoggedIn();
    }

    canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
        return this.isLoggedIn();
    }
}
