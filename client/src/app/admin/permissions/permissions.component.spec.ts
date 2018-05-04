import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';

import { PermissionsComponent } from './permissions.component';

describe('PermissionsComponent', () => {
    let component: PermissionsComponent;
    let fixture: ComponentFixture<PermissionsComponent>;
    const subscribeMock = {
        subscribe: () => { }
    };
    const MockStore = {
        dispatch: jasmine.createSpy('dispatch').and.stub(),
        select: jasmine.createSpy('select').and.returnValue(subscribeMock)
    };


    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PermissionsComponent],
            providers: [
                { provide: Store, useValue: MockStore }
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PermissionsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should load data on init', () => {
        component.ngOnInit();

        expect(MockStore.dispatch).toHaveBeenCalled();
        expect(MockStore.select).toHaveBeenCalled();
    });
});
