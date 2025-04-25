import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({ name: 'html', standalone: false })
export class HtmlPipe implements PipeTransform {

    constructor(private sanitizer: DomSanitizer) {}

    transform(value: string): any {
        return this.sanitizer.bypassSecurityTrustHtml(value);
    }
}