import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Response } from '@angular/http';

import { AuthService } from '../auth/auth.service';

@Component({
    selector: 'ee-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    constructor(private authService: AuthService, private router: Router) { }
    fullName: string;

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
        // subscribe to change of data here
        this.fullName = localStorage.getItem('fullName');
    }
}
