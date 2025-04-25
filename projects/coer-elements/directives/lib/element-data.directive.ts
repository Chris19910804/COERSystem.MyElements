import { AfterViewInit, Directive, ElementRef, output } from "@angular/core";
import { Tools } from "coer-elements/tools";

@Directive({
    selector: '[elementData]',
    standalone: false
})
export class ElementDataDirective implements AfterViewInit {  

    //Outputs 
    public onLoadedData = output<any>();
     
    constructor(private element: ElementRef) { } 
    
    ngAfterViewInit(): void {
        Tools.Sleep().then(() => {
            this.onLoadedData.emit({
                innerText: this.element.nativeElement.innerText
            }); 
        }); 
    } 
}