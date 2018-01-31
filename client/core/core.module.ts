import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CoreComponent } from './core.component';

@NgModule({
    declarations: [
        CoreComponent
    ],
    imports: [
        BrowserModule
    ],
    providers: [],
    bootstrap: [CoreComponent]
})
export class CoreModule {}