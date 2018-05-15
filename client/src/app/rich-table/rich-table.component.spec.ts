import { Pipe, PipeTransform } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RichTableComponent } from './rich-table.component';

@Pipe({ name: 'richTableGenericPipe' })
class RichTableGenericPipe implements PipeTransform {
    transform(value, args) {
        return value;
    }
}
const testData = {
    columnDef: [
        {
            index: 1,
            columnName: 'Level',
            isSortable: false,
            linkerProperty: 'name',
            columnWidth: '50%'
        },
        {
            index: 0,
            columnName: '',
            columnWidth: '35px'
        },
        {
            index: 2,
            columnName: 'Actions',
            callback: jasmine.any(Function),
            columnWidth: '80px'
        }
    ],
    list: [
        {
            _id: '123',
            name: 'test name 1'
        },
        {
            _id: '456',
            name: 'test name 2'
        }
    ]
};

describe('RichTableComponent', () => {
    let component: RichTableComponent;
    let fixture: ComponentFixture<RichTableComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                RichTableComponent,
                RichTableGenericPipe
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RichTableComponent);
        component = fixture.componentInstance;
        component.data = testData;
        component.options = {};
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
        expect(component.data).toBeDefined();
        expect(component.options).toBeDefined();
        expect(component.delete).toBeDefined();
        expect(component.toggleRowExpand).toBeDefined();
        expect(component.toggleRowExpand).toBeDefined();
    });

    it('should preprocess data', () => {
        component.ngOnInit();
        fixture.detectChanges();

        expect(component.columns).toBeDefined();

        component.columns.forEach(column => {
            expect(column.className).toBeDefined();
            expect(column.inlineStyles).toBeDefined();
        });

        expect(component.columns[0].index).toEqual(0);
        expect(component.columns[1].index).toEqual(1);
        expect(component.columns[2].index).toEqual(2);
    });
});
