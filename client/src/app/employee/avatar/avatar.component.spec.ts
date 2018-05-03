import { async, ComponentFixture, ComponentFixtureAutoDetect, TestBed } from '@angular/core/testing';
import { Directive, Input } from '@angular/core';
import { MatDialog } from '@angular/material';

import { AvatarRequest, ImagesRequest } from '../../shared/constants/request.constant';
import { MockMatDialog } from '../../shared/tests/helper.mocks';
import { AvatarComponent } from './avatar.component';
import { ImageDialogComponent } from '../image-dialog/image-dialog.component';

@Directive({ selector: '[eeImgFallback]' })
class ImgFallbackDirective { @Input() eeImgFallback: string; }

describe('AvatarComponent', () => {
    let component: AvatarComponent;
    let fixture: ComponentFixture<AvatarComponent>;

    beforeEach(async(() => {
        const moduleConfig = {
            declarations: [
                AvatarComponent,
                ImgFallbackDirective
            ],
            providers: [
                { provide: MatDialog, useClass: MockMatDialog },
                { provide: ComponentFixtureAutoDetect, useValue: true }
            ]
        };

        TestBed.configureTestingModule(moduleConfig).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AvatarComponent);
        component = fixture.componentInstance;
        component.username = 'testUsername';

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
        expect(component.username).toBeDefined();
        expect(component.avatarImagePath).toBeDefined();
        expect(component.onZoom).toBeDefined();
    });

    it('should load image with correct src attr', () => {
        const defaultURL = new ImagesRequest().base + 'avatar.png';
        const testUrl = `${new AvatarRequest().base}testUsername.png`;
        const img = fixture.nativeElement.querySelector('img');

        expect(img.src).toEqual(defaultURL);

        component.ngOnInit();
        fixture.detectChanges();

        expect(img.src).toEqual(testUrl);
    });

    it('should load zoomed image', () => {
        const testUrl = `${new AvatarRequest().base}testUsername.png`;
        spyOn(component.dialog, 'open').and.stub();

        component.ngOnInit();
        fixture.detectChanges();
        component.onZoom();

        expect(component.dialog.open).toHaveBeenCalledWith(ImageDialogComponent, { data: { url: testUrl } });
    });
});
