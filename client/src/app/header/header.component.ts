import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Response } from '@angular/http';
import { Subscription } from 'rxjs/Subscription';

import { AuthService } from '../auth/auth.service';

@Component({
    selector: 'ee-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
    fullName: string;
    subscription: Subscription;

    constructor(private authService: AuthService, private router: Router) { }

    isAuthenticated() {
        return this.authService.isAuthenticated();
    }

    logout() {
        this.authService.logout()
            .subscribe(
                (data: boolean) => {
                    if (data) {
                        this.router.navigate(['/login']);
                    }
                }
            );
    }

    ngOnInit() {
        this.subscription = this.authService.onUserLogin
            .subscribe(
                (userName: string) => {
                    this.fullName = userName;
                }
            );

        this.fullName = localStorage.getItem('fullName');
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
