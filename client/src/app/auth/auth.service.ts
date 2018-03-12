import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,  HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

const httpOptions = {
    headers: new HttpHeaders({
        'Access-Control-Allow-Origin': 'http://localhost:3000',
        'Content-Type': 'application/json'
    })
};

interface LoginResponseType {
    status: boolean;
    sessionTokenId: string;
    user: {
        username: string,
        fullName: {
            first: string,
            last: string,
            middle: string | undefined | null
        }
    };
}

@Injectable()
export class AuthService {
    sessionTokenId: string;

    constructor(private http: HttpClient) { }

    private storeSessionToken (sessionTokenId) {
        localStorage.setItem('sessionTokenId', sessionTokenId);
        this.sessionTokenId = sessionTokenId;
    }

    private cleanSessionToken () {
        localStorage.removeItem('sessionTokenId');
    }

    private storeUserInfo (user) {
        const fName = user.fullName.first
            ? `${user.fullName.first }`
            : 'Welcome ';
        const lName = user.fullName.last
        ? user.fullName.last
        : '';

        localStorage.setItem('username', user.username);
        localStorage.setItem('fullName', `${fName} ${lName}`);
    }

    private cleanUserInfo () {
        localStorage.removeItem('username');
        localStorage.removeItem('fullName');
    }

    login(loginForm: { username: string, password: string }): Observable<string> {
        return this.http.post('http://localhost:3000/auth/login', loginForm, httpOptions)
            .map((data: LoginResponseType) => {
                if (data.status) {
                    this.storeSessionToken(data.sessionTokenId);
                    this.storeUserInfo(data.user);
                }

                return data.user.username;
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
        localStorage.removeItem('sessionTokenId');
        this.sessionTokenId = null;

        return this.http.get('http://localhost:3000/auth/logout', httpOptions)
            .map((data: {status: boolean}) => {
                this.cleanSessionToken();
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

    getToken() {
        if (!this.sessionTokenId) {
            this.sessionTokenId = localStorage.getItem('sessionTokenId');
        }

        return this.sessionTokenId;
    }

    isAuthenticated() {
        return !!this.getToken();
    }
}
