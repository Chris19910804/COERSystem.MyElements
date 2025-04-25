import { Directive, OnDestroy, output, OnInit, ElementRef, AfterViewInit } from '@angular/core';
import { Tools } from 'coer-elements/tools';

@Directive({
    selector: '[lifeCycle]', 
    standalone: false
})
export class LifeCycleDirective implements OnInit, AfterViewInit, OnDestroy {

    //Outputs
    public onInit        = output<HTMLElement>();
    public afterViewInit = output<HTMLElement>();
    public onReady       = output<HTMLElement>();
    public onDestroy     = output<HTMLElement>();

    constructor(private element: ElementRef) { }

    ngOnInit() {
        this.onInit.emit(this.element.nativeElement);
    }

    ngAfterViewInit(): void {
        this.afterViewInit.emit(this.element.nativeElement);
        Tools.Sleep().then(() => this.onReady.emit(this.element.nativeElement));
    }

    ngOnDestroy() {
        this.onDestroy.emit(this.element.nativeElement);
    }
}