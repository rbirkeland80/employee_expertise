import { TestBed } from '@angular/core/testing';

import { ProfilesRichTableHelperService } from './profiles-richTableHelper.service';
import { RichTableColumnBuilderService } from '../../rich-table/rich-tableBaseColumnBuilder.service';
import { StatusTransformPipe } from '../../shared/pipes/statusTransformPipe.pipe';

describe('ProfilesRichTableHelperService service', () => {
    let service: ProfilesRichTableHelperService;

    beforeEach(() => {
        const StatusTransformPipeMock = {
            statusTransform: {
                transform: value => value
            }
        };
        const RichTableColumnBuilderServiceMock = {
            buildColumnDef: (list, cb) => list
        };
        const configObj = {
            providers: [
                ProfilesRichTableHelperService,
                { provide: RichTableColumnBuilderService, useValue: RichTableColumnBuilderServiceMock },
                { provide: StatusTransformPipe, useValue: StatusTransformPipeMock }
            ]
        };

        TestBed.configureTestingModule(configObj);

        service = TestBed.get(ProfilesRichTableHelperService);
    });


    it('should buildColumnDef array', () => {
        const columnDef = service.buildColumnDef();

        expect(columnDef.length).toEqual(3);

        columnDef.forEach((column, key) => {
            expect(column.index).toBeDefined();
            expect(column.columnName).toBeDefined();
            expect(column.linkerProperty).toBeDefined();
        });
    });

    it('should buildTableOptions object', () => {
        const options = service.buildTableOptions();

        expect(options.rowClickCb).toEqual(jasmine.any(Function));
        expect(options.paginationActionCb).toEqual(jasmine.any(Function));
        expect(options.sortingEnabled).toBeFalsy();
        expect(options.filteringEnabled).toBeFalsy();
        expect(options.filteringColumns).toBeFalsy();
        expect(options.paginationEnabled).toBeFalsy();
        expect(options.rowsPerPageSettings).toEqual([5, 10, 15]);
    });
});
