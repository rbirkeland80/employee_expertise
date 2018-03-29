import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { MockMatDialogRef } from '../../shared/tests/helper.mocks';
import { ImageDialogComponent } from './image-dialog.component';

describe('ImageDialogComponent', () => {
    const testUrl = 'http://www.test.com/test.png';
    let component: ImageDialogComponent;
    let fixture: ComponentFixture<ImageDialogComponent>;

    beforeEach(async(() => {
        const moduleConfig = {
            declarations: [ImageDialogComponent],
            providers: [
                { provide: MatDialogRef, useClass: MockMatDialogRef },
                { provide: MAT_DIALOG_DATA, useValue: { url: testUrl } }
            ]
        };

        TestBed.configureTestingModule(moduleConfig).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ImageDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
        expect(component.data.url).toEqual(testUrl);
        expect(component.closeDialog).toBeDefined();
    });

    it('should pass correct values to DOM', () => {
        const img = fixture.nativeElement.querySelector('img');
        const closeIcon = fixture.nativeElement.querySelector('.fa.fa-close');

        expect(img.src).toEqual(testUrl);
        expect(closeIcon.title).toEqual('Close dialog');
    });

    it('should close the dialog', () => {
        spyOn(component.dialogRef, 'close');
        component.closeDialog();

        expect(component.dialogRef.close).toHaveBeenCalled();
    });
});
