import { NgModule } from '@angular/core';
import { CoerRefDirective } from './coer-ref.directive';
import { LifeCycleDirective } from './life-cycle.directive';
import { ElementDataDirective } from './element-data.directive';

@NgModule({
    declarations: [
        CoerRefDirective,
        ElementDataDirective,
        LifeCycleDirective,
    ],
    exports: [
        CoerRefDirective,
        ElementDataDirective,
        LifeCycleDirective
    ]
})
export class DirectivesModule { }