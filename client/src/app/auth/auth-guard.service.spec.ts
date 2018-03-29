import { Router, Route, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

import { AuthGuard } from './auth-guard.service';
import { AuthService } from './auth.service';

describe('AuthGuard service', () => {
    let service: AuthGuard;
    let isAuthenticatedMockValue = true;
    const testRoute: Route = { path: 'someRoute' };
    const mockSnapshot: any = jasmine.createSpyObj<ActivatedRouteSnapshot>('ActivatedRouteSnapshot', ['toString']);
    const mockState: any = jasmine.createSpyObj<RouterStateSnapshot>('RouterStateSnapshot', ['toString']);

    const authServiceMock = {
        isAuthenticated: function () {
            return isAuthenticatedMockValue;
        }
    };

    const routerMock = {
        navigate: function (route) {}
    };

    describe('Positive(authenticated) flow', () => {
        beforeEach(() => { service = new AuthGuard(authServiceMock as AuthService, routerMock as Router); });

        it('#isLoggedIn should return true', () => {
            expect(service.isLoggedIn()).toBeTruthy();
        });

        it('#canLoad should return true', () => {
            expect(service.canLoad(testRoute)).toBeTruthy();
        });

        it('#canActivate should return true', () => {
            expect(service.canActivate(mockSnapshot, mockState)).toBeTruthy();
        });
    });

    describe('Negative(not authenticated) flow', () => {
        beforeEach(() => {
            isAuthenticatedMockValue = false;
            service = new AuthGuard(authServiceMock as AuthService, routerMock as Router);
        });

        it('#isLoggedIn should return false', () => {
            expect(service.isLoggedIn()).toBeFalsy();
        });

        it('#canLoad should return false', () => {
            expect(service.canLoad(testRoute)).toBeFalsy();
        });

        it('#canActivate should return false', () => {
            expect(service.canActivate(mockSnapshot, mockState)).toBeFalsy();
        });
    });
});
