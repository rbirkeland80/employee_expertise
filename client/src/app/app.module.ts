import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
// import { StoreRouterConnectingModule } from '@ngrx/router-store';
// import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './auth/auth.module';
import { HeaderModule } from './header/header.module';
import { EmployeeModule } from './employee/employee.module';

import { AppComponent } from './app.component';

import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth-guard.service';

import { appReducers } from './store/app.reducers';

import { httpInterceptorProviders } from './http-interceptors/index';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        // BrowserModule.withServerTransition({appId: 'ee-app'}),
        BrowserAnimationsModule,
        HttpClientModule,
        HeaderModule,
        AuthModule,
        EmployeeModule,
        AppRoutingModule,
        StoreModule.forRoot(appReducers),
        EffectsModule.forRoot([]),
        // StoreRouterConnectingModule,
        // environment ? StoreDevtoolsModule.instrument() : []
    ],
    providers: [
        AuthService,
        AuthGuard,
        httpInterceptorProviders
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
