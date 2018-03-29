import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component, DebugElement } from '@angular/core';

import { ImgFallbackDirective } from './img-fallback.directive';
import { ImagesRequest } from '../../shared/constants/request.constant';

const fallbackUrl = 'http://lorempixel.com/150/100';

@Component({
    template: `
        <img src="" [eeImgFallback]="'${fallbackUrl}'"/>
        <img src="favicon.ico" [eeImgFallback]="'${fallbackUrl}'"/>
        <img src="" eeImgFallback/>
    `
})
class TestComponent { }

describe('ImgFallbackDirective', () => {
    let fixture: ComponentFixture<TestComponent>, elements: DebugElement[];

    beforeEach(() => {
        fixture = TestBed.configureTestingModule({
            declarations: [ ImgFallbackDirective, TestComponent ]
        })
        .createComponent(TestComponent);

        fixture.detectChanges();

        elements = fixture.debugElement.queryAll(By.directive(ImgFallbackDirective));
    });

    it('should detect element', () => {
        expect(elements.length).toBe(3);
    });

    it('should replace img src for the first element', () => {
        const imgSrc = elements[0].nativeElement.src;

        async(() => {
            expect(imgSrc).toBe(fallbackUrl);
        });
    });

    it('should not replace img src for the second element', () => {
        const imgSrc = elements[1].nativeElement.src;

        expect(imgSrc).toContain('/favicon.ico');
    });

    it('should use default no-image available for the third element', () => {
        const imgSrc = elements[2].nativeElement.src;

        async(() => {
            expect(imgSrc).toBe(`${new ImagesRequest().base}no-image-available.png`);
        });
    });
});
