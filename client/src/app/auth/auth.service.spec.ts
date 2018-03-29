import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { asyncData } from '../shared/tests/async-observable-helper';

import { AuthService } from './auth.service';

describe('AuthService service', () => {
    let httpClient: HttpClient;
    let httpTestingController: HttpTestingController;
    let service: AuthService;
    const testLoginBody = { username: 'string', password: 'string' };
    const loginResponse = {
        username: 'user',
        id: '123',
        fullName: {
            first: 'First',
            last: 'Last'
        }
    };

    beforeEach(() => {
        const configObj = {
            providers: [
                AuthService
            ],
            imports: [ HttpClientTestingModule ]
        };

        TestBed.configureTestingModule(configObj);

        service = TestBed.get(AuthService);
        httpClient = TestBed.get(HttpClient);
        httpTestingController = TestBed.get(HttpTestingController);
    });

    describe('API calls', () => {
        const testLoginUrl = 'http://localhost:3000/auth/login';
        const testLogoutUrl = 'http://localhost:3000/auth/logout';
        const testRequestOptions = {
            headers: jasmine.any(Object),
            withCredentials: true,
            reportProgress: true
        };

        afterEach(() => {
            httpTestingController.verify();
        });

        it('should call login api', () => {
            httpClient.post<any>(testLoginUrl, testLoginBody)
                .subscribe(data =>
                    expect(data).toEqual(loginResponse)
                );
            spyOn(httpClient, 'post').and.callThrough();
            const req = httpTestingController.expectOne(testLoginUrl);

            service.login(testLoginBody);

            expect(req.request.method).toEqual('POST');

            req.flush(loginResponse);
        });

        it('should call logout api', () => {
            httpClient.get<any>(testLogoutUrl)
                .subscribe(data =>
                    expect(data).toEqual({ status: true })
                );
            spyOn(httpClient, 'get').and.callThrough();
            const req = httpTestingController.expectOne(testLogoutUrl);

            service.logout();

            expect(req.request.method).toEqual('GET');

            req.flush({ status: true });
        });
    });

    describe('Positive api response handlers', () => {
        let httpClientSpy;

        beforeEach(() => {
            httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post']);
            service = new AuthService(<any> httpClientSpy);
        });

        it('should handle successful login', () => {
            spyOn(service.onUserLogin, 'next').and.stub();
            spyOn(localStorage, 'setItem').and.stub();
            httpClientSpy.post.and.returnValue(asyncData(loginResponse));

            service.login(testLoginBody).subscribe(
                data => {
                    expect(localStorage.setItem).toHaveBeenCalledWith('userId', '123');
                    expect(localStorage.setItem).toHaveBeenCalledWith('username', 'user');
                    expect(localStorage.setItem).toHaveBeenCalledWith('fullName', 'First Last');
                    expect(localStorage.setItem).toHaveBeenCalledWith('sessionTokenId', 'test token');
                    expect(service.onUserLogin.next).toHaveBeenCalledWith('First Last');
                }
            );

            expect(httpClientSpy.post.calls.count()).toBe(1, 'one call');
        });

        it('should handle successful logout', () => {
            spyOn(localStorage, 'clear').and.stub();
            httpClientSpy.get.and.returnValue(asyncData({ status: true }));

            service.logout().subscribe(
                data => {
                    expect(localStorage.clear).toHaveBeenCalled();
                }
            );

            expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
        });
    });

    describe('Negative api response handlers', () => {
        let httpClientSpy;
        const errorResponse = new HttpErrorResponse({
            error: 'test 404 error',
            status: 404, statusText: 'Not Found'
        });

        beforeEach(() => {
            httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post']);
            service = new AuthService(<any> httpClientSpy);
        });

        it('should handle login failure', () => {
            spyOn(service.onUserLogin, 'next').and.stub();
            spyOn(localStorage, 'setItem').and.stub();
            httpClientSpy.post.and.returnValue(asyncData(errorResponse));

            service.login(testLoginBody).subscribe(
                data => { },
                error => {
                    expect(localStorage.setItem).not.toHaveBeenCalled();
                    expect(service.onUserLogin.next).not.toHaveBeenCalled();
                }
            );

            expect(httpClientSpy.post.calls.count()).toBe(1, 'one call');
        });

        it('should handle logout failure', () => {
            spyOn(localStorage, 'clear').and.stub();
            httpClientSpy.get.and.returnValue(asyncData(errorResponse));

            service.logout().subscribe(
                data => { },
                error => {
                    expect(localStorage.clear).not.toHaveBeenCalled();
                }
            );

            expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
        });
    });
});
