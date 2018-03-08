import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { trigger, state, style, animate, transition } from '@angular/animations';

import { AuthService } from '../auth.service';

@Component({
    selector: 'ee-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [
        trigger('flyInOut', [
            state('in', style({
                opacity: 1,
                transform: 'translate(0, 0)'
            })),
            transition('void => in', [
                style({
                    transform: 'translate(-50%, -100%)',
                    opacity: 0
                }),
                animate('150ms ease-in')
            ]),
        ])
    ]
})
export class LoginComponent {
    constructor(private authService: AuthService, private router: Router) { }

    requestError = null;

    onLogin(form: NgForm) {
        const loginForm = {
            username: form.value.username,
            password: form.value.password
        };

        this.authService.login(loginForm)
            .subscribe(
                (username: string) => {
                    this.router.navigate(['employees', username ]);
                },
                (error: string) => {
                    this.requestError = error;
                }
            );
    }

}
