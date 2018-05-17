import { TestBed } from '@angular/core/testing';

import { RichTableColumnBuilderService } from './rich-tableBaseColumnBuilder.service';
import { ColumnDefModel } from './rich-table.model';

describe('PermissionRichTableHelperService service', () => {
    let service: RichTableColumnBuilderService;

    beforeEach(() => {
        const StatusTransformPipeMock = {
            statusTransform: {
                transform: value => value
            }
        };
        const configObj = {
            providers: [
                RichTableColumnBuilderService
            ]
        };

        TestBed.configureTestingModule(configObj);

        service = TestBed.get(RichTableColumnBuilderService);
    });


    it('should buildColumnDef array', () => {
        const columnDef = service.buildColumnDef(fakeRichTableColumnDefinition(), () => {});

        expect(columnDef.length).toEqual(4);

        columnDef.forEach((column, key) => {
            expect(column.index).toBeDefined();
            expect(column.columnName).toBeDefined();

            if (column.index !== columnDef.length - 1 && column.index !== 0) {
                console.error(column);
                expect(column.linkerProperty).toBeDefined();
            }
        });
    });
});

function fakeRichTableColumnDefinition (): ColumnDefModel[] {
    return [
        {
            index: 0,
            columnName: 'Level',
            isSortable: false,
            linkerProperty: 'name',
            columnWidth: '50%'
        },
        {
            index: 4,
            columnName: 'Status',
            isSortable: false,
            linkerProperty: 'name2',
            columnWidth: '80px'
        }
    ];
}
