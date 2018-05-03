import { Component } from '@angular/core';

@Component({
    selector: 'ee-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
    sidebarOpened = true;
    toggleSign = '<';

    constructor() { }

    updateToggleSign () {
        this.toggleSign = this.sidebarOpened ? '<' : '>';
    }
}
