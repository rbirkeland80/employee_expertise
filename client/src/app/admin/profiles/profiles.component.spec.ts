import { Component, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';

import { ProfilesComponent } from './profiles.component';
import { ProfilesRichTableHelperService } from './profiles-richTableHelper.service';
import { TableData, TableOptions, ColumnDefModel } from '../../rich-table/rich-table.model';

@Component({selector: 'ee-rich-table', template: ''})
class RichTableStubComponent {
    @Input() data: TableData;
    @Input() options: TableOptions;
}

describe('ProfilesComponent', () => {
    let component: ProfilesComponent;
    let fixture: ComponentFixture<ProfilesComponent>;
    const subscribeMock = {
        subscribe: () => { }
    };
    const MockStore = {
        dispatch: jasmine.createSpy('dispatch').and.stub(),
        select: jasmine.createSpy('select').and.returnValue(subscribeMock)
    };
    const MockRichTableHelperService = {
        buildColumnDef: jasmine.createSpy('buildColumnDef').and.returnValue(fakeRichTableColumnDefinition()),
        buildTableOptions: jasmine.createSpy('buildTableOptions').and.returnValue(fakeRichTableTableOptions())
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ ProfilesComponent, RichTableStubComponent ],
            providers: [
                { provide: Store, useValue: MockStore },
                { provide: ProfilesRichTableHelperService, useValue: MockRichTableHelperService }
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProfilesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
        expect(component.tableData).toEqual({ columnDef: fakeRichTableColumnDefinition(), list: jasmine.any(Object) });
        expect(component.tableOptions).toEqual(fakeRichTableTableOptions());
    });

    it('should load data on init', () => {
        component.ngOnInit();

        expect(MockStore.dispatch).toHaveBeenCalled();
        expect(MockStore.select).toHaveBeenCalled();
    });
});

function fakeRichTableColumnDefinition (): ColumnDefModel[] {
    return [
        {
            index: 0,
            columnName: '',
            columnWidth: '35px'
        },
        {
            index: 1,
            columnName: 'Level',
            isSortable: false,
            linkerProperty: 'name',
            columnWidth: '50%'
        },
        {
            index: 4,
            columnName: 'Actions',
            isSortable: false,
            callback: jasmine.any(Function),
            columnWidth: '80px'
        }
    ];
}

function fakeRichTableTableOptions (): TableOptions {
    return {
        sortingEnabled: false,
        filteringEnabled: false,
        filteringColumns: ['Level'],
        paginationEnabled: false,
        rowsPerPageSettings: [5, 10, 15],
    };
}
