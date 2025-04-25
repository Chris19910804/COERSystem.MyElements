import { AfterViewInit, Component, computed, input, output, WritableSignal } from '@angular/core';
import { isModalOpenSIGNAL, isMenuOpenSIGNAL, isLoadingSIGNAL } from 'coer-elements/signals';  
import { IMenuToolbar, IUserLogin } from 'coer-elements/interfaces';
import { ElementsHTML, Tools } from 'coer-elements/tools';
declare const appSettings: any;

@Component({
    selector: 'coer-toolbar',
    templateUrl: './coer-toolbar.component.html',
    styleUrl: './coer-toolbar.component.scss',
    standalone: false
})
export class CoerToolbar implements AfterViewInit {  

    //variables
    protected isReadyPage:  boolean = false;
    protected isLoading:    boolean = false;
    protected awaitSignals: boolean = false; 
    protected _isModalOpen: WritableSignal<boolean> = isModalOpenSIGNAL; 

    //appSettings
    protected appName      = Tools.AvoidNull<string>(appSettings?.appInfo?.name,      'string');  
    protected appLogoPath  = Tools.AvoidNull<string>(appSettings?.appInfo?.logoPath,  'string');
    protected appLogoWidth = Tools.AvoidNull<string>(appSettings?.appInfo?.logoWidth, 'string'); 
       
    //Inputs
    public user  = input<IUserLogin | null>(null);
    public image = input<string | null>(null);
    public menu  = input<IMenuToolbar[]>([]);  

    //Outputs 
    public onClickMenu   = output<void>(); 
    public onClickOption = output<IMenuToolbar>(); 
 
    ngAfterViewInit() {  
        Tools.Sleep(1000).then(() => this.isReadyPage = true); 
    }

    /** */
    protected ToogleSideNave(): void {
        this.isLoading = true;
        this.onClickMenu.emit();
        isMenuOpenSIGNAL.set(!isMenuOpenSIGNAL());
        Tools.Sleep(500, 'ToogleSideNave').then(() => this.isLoading = false);
    }   
    

    //computed
    protected userName = computed<string>(() => { 
        const user = this.user();

        if (Tools.IsNotNull(user)) {
            if (Tools.IsNotOnlyWhiteSpace(user?.nickname)) return user?.nickname!;
            if (Tools.IsNotOnlyWhiteSpace(user?.fullName)) return user?.fullName!;
            if (Tools.IsNotOnlyWhiteSpace(user?.user))     return user?.user!; 
        }
    
        return ''; 
    });


    //computed
    protected userTitle = computed<string>(() => {
        const user = this.user();

        if (Tools.IsNotNull(user)) {
            if (Tools.IsNotOnlyWhiteSpace(user?.role)) return user?.role!;
        } 

        return '';
    });  


    //getter
    protected get showLogo(): boolean { 
        return (Tools.IsNull(appSettings?.appInfo?.showLogo) && this.appLogoPath.length > 0) 
            || (appSettings?.appInfo?.showLogo && this.appLogoPath.length > 0)
    }


    //getter
    protected get showUser(): boolean {
        return !isLoadingSIGNAL() 
            && Tools.IsNotNull(this.user())
    } 


    //getter
    protected get paddingLeft(): string {
        return (this.userName().length > 0 || this.userTitle().length > 0)
            ? '5px' : '0px';
    }


    /** */ 
    protected GetPadding = (container: 'user-identity' | 'user-container'): string => {
        if (this.userName().length > 0 || this.userTitle().length > 0) { 
            switch(container) {
                case 'user-container': return '10px';
                case 'user-identity': return '5px'; 
            }
        } 

        switch(container) {
            case 'user-container': return '2px';
            case 'user-identity': return '0px'; 
        }
    }


    /** */
    protected GetElementWidth = (element: HTMLElement): string => { 
        return this.isReadyPage 
            ? ElementsHTML.GetElementWidth(element, 48)
            : '0px'; 
    } 
}