import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';

import { AdminComponent } from './admin.component';

@Component({selector: 'router-outlet', template: ''})
class RouterOutletStubComponent { }

describe('AdminComponent (class only)', () => {
    let component: AdminComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ AdminComponent ]
        });

        component = TestBed.get(AdminComponent);
    });

    it('should create component', () => {
        expect(component).toBeDefined();
        expect(component.sidebarOpened).toBeTruthy();
        expect(component.toggleSign).toEqual('<');
        expect(component.updateToggleSign).toBeDefined();
    });

    it('should updateToggleSign', () => {
        component.sidebarOpened = false;

        component.updateToggleSign();

        expect(component.toggleSign).toEqual('>');

        component.sidebarOpened = true;

        component.updateToggleSign();

        expect(component.toggleSign).toEqual('<');
    });
});

describe('AdminComponent', () => {
    let component: AdminComponent;
    let fixture: ComponentFixture<AdminComponent>;
    let sideBar: HTMLElement;
    let page: HTMLElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ AdminComponent, RouterOutletStubComponent ],
            imports: [
                MatSidenavModule, BrowserAnimationsModule
            ]
        });

        fixture = TestBed.createComponent(AdminComponent);
        component = fixture.componentInstance;

        sideBar = fixture.nativeElement.querySelector('mat-drawer ul');
        page = fixture.nativeElement.querySelector('mat-drawer-content');
    });

    it('should render tabs on the side bar', () => {
        fixture.detectChanges();
        const content = sideBar.textContent;

        expect(content).toContain('Employees');
        expect(content).toContain('Levels');
        expect(content).toContain('Profiles');
        expect(content).toContain('Expertise');
    });

    it('should render nested tab content', () => {
        fixture.detectChanges();
        const toggleSign = page.querySelector('.toggle-sign').nodeValue;
        const routerOutlet = page.querySelector('router-outlet ');

        expect(toggleSign).toBeDefined();
        expect(routerOutlet).toBeDefined();
    });
});
