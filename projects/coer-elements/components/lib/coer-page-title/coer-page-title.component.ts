import { Component, input, output } from '@angular/core';
import { IBreadcrumb, IGoBack, IInformation } from 'coer-elements/interfaces';
import { Menu, Tools } from 'coer-elements/tools'; 

@Component({
    selector: 'coer-page-title',
    templateUrl: './coer-page-title.component.html',
    styleUrls: ['./coer-page-title.component.scss'],
    standalone: false
})
export class CoerPageTitle {

    //Inputs 
    public title           = input<string | null>(null);
    public showBreadcrumbs = input<boolean>(true);
    public breadcrumbs     = input<IBreadcrumb[]>([]);
    public goBack          = input<IGoBack>({ show: false });
    public information     = input<IInformation>({ show: false });

    //Outputs 
    public onClickInformation = output<void>();

    //getter
    protected get _icon(): string {
        const MENU = Menu.GetSelectedOption();

        if(MENU) {
            const MENU_SELECTED = MENU.tree.shift();
            if(MENU_SELECTED && MENU_SELECTED.icon) {
                return MENU_SELECTED.icon;
            }
        }

        return 'bi bi-house-door-fill';
    }


    //getter
    protected get _tooltip(): string {
        return Tools.IsNotNull(this.information()) 
            && Tools.IsNotOnlyWhiteSpace(this.information()?.tooltip)
            ? this.information().tooltip! : 'Information';
    } 
}