import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './auth/auth.module';
import { HeaderModule } from './header/header.module';
import { EmployeeModule } from './employee/employee.module';

import { AppComponent } from './app.component';

import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth-guard.service';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        //BrowserModule.withServerTransition({appId: 'ee-app'}),
        BrowserAnimationsModule,
        HttpClientModule,
        HeaderModule,
        AuthModule,
        EmployeeModule,
        AppRoutingModule
    ],
    providers: [
        AuthService,
        AuthGuard
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
