import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { AuthRequest } from '../shared/constants/request.constant';

const httpOptions = {
    headers: new HttpHeaders({
        'Access-Control-Allow-Origin': 'http://localhost:3000',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': 'true'
    }),
    withCredentials: true,
    reportProgress: true
};

interface LoginResponseType {
    username: string;
    fullName: {
        first: string,
        last: string,
        middle: string | undefined | null
    };
}

@Injectable()
export class AuthService {
    onUserLogin = new Subject<string>();
    private sessionTokenId: string;

    constructor(private http: HttpClient) { }

    private cleanSessionCookie () {
        // TO DO: see how to delete session cookie
        this.sessionTokenId = null;
        localStorage.removeItem('sessionTokenId');
    }

    private storeBasicUserInfo (user) {
        const fName = user.fullName.first
            ? `${user.fullName.first }`
            : 'Welcome ';
        const lName = user.fullName.last
            ? user.fullName.last
            : '';
        const fullName = `${fName} ${lName}`;

        localStorage.setItem('userId', user.id);
        localStorage.setItem('username', user.username);
        localStorage.setItem('fullName', fullName);

        this.onUserLogin.next(fullName);
    }

    private cleanUserInfo () {
        localStorage.clear();
    }

    login(loginForm: { username: string, password: string }): Observable<string> {
        const authBaseUrl = new AuthRequest().base;

        return this.http.post(`${authBaseUrl}login`, loginForm, httpOptions)
            .map((data: LoginResponseType) => {
                if (data) {
                    this.storeBasicUserInfo(data);
                }
                // TO DO: remove once able to deal with cookies
                localStorage.setItem('sessionTokenId', 'test token');
                this.sessionTokenId = 'test token';
            })
            .catch((error: HttpErrorResponse): Observable<any> => {
                if (error.error instanceof ErrorEvent) {
                    console.error('An error occurred:', error.error.message);

                    return new ErrorObservable('Something bad happened; please try again later.');
                } else {
                    console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);

                    return new ErrorObservable('Oops! Wrong username or password.');
                }
            });
    }

    logout(): Observable<boolean> {
        return this.http.get('http://localhost:3000/auth/logout', httpOptions)
            .map((data: {status: boolean}) => {
                this.cleanSessionCookie();
                this.cleanUserInfo();
                return data.status;
            })
            .catch((error: HttpErrorResponse): Observable<any> => {
                if (error.error instanceof ErrorEvent) {
                    console.error('An error occurred:', error.error.message);

                    return new ErrorObservable('Something bad happened; please try again later.');
                } else {
                    console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);

                    return new ErrorObservable('Oops! Wrong username or password.');
                }
            });

    }

    private getSessionCookie() {
        if (!this.sessionTokenId) {
            this.sessionTokenId = localStorage.getItem('sessionTokenId');
        }

        return this.sessionTokenId;
    }

    isAuthenticated() {
        return !!this.getSessionCookie();
    }
}
