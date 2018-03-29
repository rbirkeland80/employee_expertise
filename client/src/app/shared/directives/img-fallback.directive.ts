import { Directive, Input, ElementRef, Renderer2, OnInit, OnDestroy } from '@angular/core';

import { ImagesRequest } from '../../shared/constants/request.constant';

@Directive({
    selector: '[eeImgFallback]'
})
export class ImgFallbackDirective implements OnInit, OnDestroy {
    @Input('eeImgFallback') fallbackUrl: string;
    private defaultUrl = new ImagesRequest().base + 'no-image-available.png';
    private nativeElement: HTMLElement;
    private errorEventSubscription;

    constructor(private el: ElementRef, private renderer: Renderer2) {
        this.nativeElement = el.nativeElement;
        this.onError = this.onError.bind(this);

        this.errorEventSubscription = this.renderer.listen(this.nativeElement, 'error', this.onError);
    }

    private onError () {
        const url = this.fallbackUrl || this.defaultUrl;

        if (this.nativeElement.getAttribute('src') !== url) {
            this.renderer.setAttribute(this.nativeElement, 'src', url);
        }
    }

    ngOnInit() {
        this.errorEventSubscription = this.renderer.listen(this.nativeElement, 'error', this.onError);
    }

    ngOnDestroy() {
        if (this.errorEventSubscription) {
            this.errorEventSubscription();
        }
    }
}
