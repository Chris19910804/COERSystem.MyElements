import { isLoadingSIGNAL, navigationSIGNAL, isMenuOpenSIGNAL, colorsSIGNAL } from 'coer-elements/signals';
import { AfterContentInit, Component, computed, inject, Input, input, OnDestroy, output, signal, viewChild, WritableSignal } from '@angular/core';     
import { IFile, ILogIn, IMenu, IOption, IMenuToolbar, IUserLogin } from 'coer-elements/interfaces';
import { CoerButton, CoerModal, CoerSidenav, CoerTextBox } from 'coer-elements/components';
import { CoerAlert, ElementsHTML, Menu, Tools, User } from 'coer-elements/tools';
import { LoginPage } from './login/login.component';
import { JWTService } from 'coer-elements/services';
import moment from 'moment';
declare const appSettings: any;

@Component({
    selector: 'coer-system',
    templateUrl: './coer-system.component.html', 
    styleUrl: './coer-system.component.scss', 
    standalone: false
})
export class COERSystem implements AfterContentInit, OnDestroy { 

    //Injection
    protected readonly _alert = inject(CoerAlert);
    protected readonly _jwtService = inject(JWTService); 

    //appSettings 
    protected _appName     = Tools.AvoidNull<string>(appSettings?.appInfo?.name,       'string');
    protected _staticLogin = Tools.AvoidNull<boolean>(appSettings?.login?.staticLogin, 'boolean');

    //Elements
    protected _sidenav = viewChild.required<CoerSidenav>('sidenav');
    protected _loginPage = viewChild.required<LoginPage>('loginPage'); 
    protected _modalProfile = viewChild.required<CoerModal>('modalProfile');
    protected _modalPassword = viewChild.required<CoerModal>('modalPassword');
    protected _inputPassword = viewChild.required<CoerTextBox>('inputPassword');
    protected _inputPasswordConfirm = viewChild.required<CoerTextBox>('inputPasswordConfirm');
    protected _resetButton = viewChild.required<CoerButton>('resetButton');

    //Variables 
    protected _startJWT$!: any; 
    protected _watchJWT$!: any; 
    protected _isLoading: WritableSignal<boolean> = isLoadingSIGNAL; 
    protected _mainRole: IOption | null = null
    protected _nickname: string = '';
    protected _password: string = '';
    protected _passwordConfirm: string = '';
    protected _userRoles = signal<IOption[]>([]); 
    protected _user = signal<IUserLogin | null>(null); 
    protected _userImageStatic: string = '';  
    
    //Inputs
    public userImage   = input<string | null>(null); 
    public toolbarMenu = input<IMenuToolbar[]>([]);  

    @Input() set user(value: IUserLogin | null) {
        if(Tools.IsNotNull(value)) {

            this._user.set(value);   
            Tools.Sleep(1000, 'coerSystemGetUser').then(() => {  
            
                if (Tools.IsNotOnlyWhiteSpace(this._user()?.nickname)) {
                    this._nickname = this._user()?.nickname!;
                } 

            }); 
        }            
    }  


    @Input() set userRoles(value: string[]) {
        if(Tools.IsNotNull(value)) {
            let id = 0;  
            this._userRoles.set(value.map(item => Object.assign({ id: ++id, option: item })));  
            
            Tools.Sleep(1000, 'coerSystemGetUserRoles').then(() => { 
                this._mainRole = this._userRoles().find(x => x.option === this._user()?.role) || null; 
            }); 
        }            
    }  


    @Input() set navigation(value: IMenu[]) {
        if(Tools.IsNotNull(value)) {
            navigationSIGNAL.set(value);  
            
            Tools.Sleep(1000, 'coerSystemGetUserNavigation').then(() => { 
                if (Tools.IsNotNull(this._user())) {
                    this._sidenav().SetActiveLink(Menu.GetSelectedOption());
                }
            }); 
        }            
    }  


    //Outputs 
    public onLogin            = output<ILogIn>();
    public onClickMenuOption  = output<IMenuToolbar>();
    public onResetPassword    = output<string>();
    public onRecoveryPassword = output<string>();  
    public onUpdateProfile    = output<IUserLogin>();
    public onUploadUserImage  = output<IFile>();
    public onDeleteUserImage  = output<void>();
    public onUpdateJWT        = output<void>();

    //Generic Tools
    protected IsNotNull = Tools.IsNotNull; 
    protected IsNotOnlyWhiteSpace = Tools.IsNotOnlyWhiteSpace;


    async ngAfterContentInit() {
        await Tools.Sleep();

        colorsSIGNAL.update(colors => ({
            fixedColors: { ...colors.fixedColors },
            actionColors: {
                primary:     ElementsHTML.GetElementColor(ElementsHTML.GetElement('#coer-system-actionColors-primary'    )),
                secondary:   ElementsHTML.GetElementColor(ElementsHTML.GetElement('#coer-system-actionColors-secondary'  )),
                success:     ElementsHTML.GetElementColor(ElementsHTML.GetElement('#coer-system-actionColors-success'    )),
                warning:     ElementsHTML.GetElementColor(ElementsHTML.GetElement('#coer-system-actionColors-warning'    )),
                danger:      ElementsHTML.GetElementColor(ElementsHTML.GetElement('#coer-system-actionColors-danger'     )),
                navigation:  ElementsHTML.GetElementColor(ElementsHTML.GetElement('#coer-system-actionColors-navigation' )),
                information: ElementsHTML.GetElementColor(ElementsHTML.GetElement('#coer-system-actionColors-information'))
            },
            appColors: {
                breadcrumbs:   ElementsHTML.GetElementColor(ElementsHTML.GetElement('#coer-system-appColors-breadcrumbs'  )),
                background:    ElementsHTML.GetElementColor(ElementsHTML.GetElement('#coer-system-appColors-background'   )),
                containers:    ElementsHTML.GetElementColor(ElementsHTML.GetElement('#coer-system-appColors-containers'   )),
                sidenav:       ElementsHTML.GetElementColor(ElementsHTML.GetElement('#coer-system-appColors-sidenav'      )),
                sidenavText:   ElementsHTML.GetElementColor(ElementsHTML.GetElement('#coer-system-appColors-sidenav-text' )),
                sidenavActive: ElementsHTML.GetElementColor(ElementsHTML.GetElement('#coer-system-appColors-sidenav-active')),
                toolbar:       ElementsHTML.GetElementColor(ElementsHTML.GetElement('#coer-system-appColors-toolbar'      )),
                toolbarText:   ElementsHTML.GetElementColor(ElementsHTML.GetElement('#coer-system-appColors-toolbar-text' ))
            }
        })); 
    }
    
    
    ngOnDestroy() {
        clearInterval(this._watchJWT$);
        clearInterval(this._startJWT$); 
    }


    //getter
    protected get _enableButtonLogin() {
        return Tools.IsNotOnlyWhiteSpace(this._user())
            && Tools.IsNotOnlyWhiteSpace(this._password)
            && Tools.IsNotOnlyWhiteSpace(this._passwordConfirm)
            && this._password.length >= 5
            && this._passwordConfirm.length >= 5
            && !this._isLoading()
            && this._password === this._passwordConfirm
    }


    //getter
    protected get _profileTitle(): string {
        return Tools.IsNotOnlyWhiteSpace(this._user()?.fullName) 
            ? this._user()?.fullName!
            : this._user()?.user!
    }


    //getter
    protected get _userImage(): string {
        return this._staticLogin
            ? this._userImageStatic
            : (this.IsNotOnlyWhiteSpace(this.userImage()) ? this.userImage()! : '')
    }


    //computed
    protected _toolbarMenu = computed<IMenuToolbar[]>(() => { 
        let toolbarMenu = this.toolbarMenu();

        if(this._staticLogin) {
            const index = toolbarMenu.findIndex(x => x.label.toUpperCase() == 'RESET PASSWORD');
            if(index > -1) toolbarMenu.splice(index, 1);
        }

        return toolbarMenu.concat([{ label: 'Log Out', icon: 'fa-solid fa-door-open' }]);
    }); 


    /** */
    protected async __SelectedOption(menu: IMenuToolbar) {
        this.onClickMenuOption.emit(menu);
        if (Tools.AvoidNull<boolean>(menu?.preventDefault, 'boolean')) return;
        const hasPath = Tools.IsNotOnlyWhiteSpace(menu?.path); 

        switch(menu.label) {
            case 'Profile': {
                if(!hasPath) this._modalProfile().Open();   
                break;
            }

            case 'Reset Password': {
                if(!hasPath && !this._staticLogin) {
                    this._modalPassword().Open();
                    await Tools.Sleep(750);
                    this.__Focus();
                }
                
                break;
            }

            case 'Log Out': {
                if(!hasPath) User.LogOut();
                break;
            } 
        } 
    } 


    /** */
    public SetUser(user: string) {
        this._loginPage().SetUser(user);
    }


    /** */
    public FocusUser() {
        this._loginPage().FocusUser();
    }


    /** */
    public FocusPassword() {
        this._loginPage().FocusPassword();
    }


    /** */
    protected __Focus() {  
        if(Tools.IsOnlyWhiteSpace(this._password)) {
            this._inputPassword().Focus();
            return;
        }

        if(Tools.IsOnlyWhiteSpace(this._passwordConfirm)) { 
            this._inputPasswordConfirm().Focus();
            return;
        } 
        
        if(this._enableButtonLogin) {
            this._resetButton().Focus();
        } 
    }


    /** */
    protected __ResetPassword() {    
        if(this._enableButtonLogin && !this._staticLogin) { 
            this.onResetPassword.emit(this._password);
        } 
    }


    /** */
    public CloseModal() {
        this._modalPassword().Close(); 
        this._modalProfile().Close();
    }


    /** */
    public Show(view: 'LOGIN' | 'RECOVERY') {
        this._loginPage().Show(view);
    }


    /** */
    public UpdateProfile() { 
        if(!this._staticLogin) {
            
            const role = this._userRoles().length > 1 
                ? Tools.AvoidNull(this._mainRole?.option, 'string') 
                : this._user()?.role;

            this.onUpdateProfile.emit({ 
                userId:     Tools.AvoidNull(this._user()?.userId,     'number'),
                user:       Tools.AvoidNull(this._user()?.user,       'string'), 
                userNumber: Tools.AvoidNull(this._user()?.userNumber, 'string'),  
                role:       role,
                fullName:   Tools.AvoidNull(this._user()?.fullName,   'string'), 
                nickname:   Tools.AvoidNull(this._nickname,           'string'), 
                email:      Tools.AvoidNull(this._user()?.email,      'string'), 
                roles:      this._userRoles().map(item => item.option)           
            });
        }
    }


    /** */
    protected __UploadImage(images: IFile[]) { 
        if(images.length > 0) {
            const [image] = images; 
            
            if(this._staticLogin) {
                this._userImageStatic = image.base64 || '';
            }

            else {
                this.onUploadUserImage.emit(image); 
            }
        }
    }


    /** */
    protected __DeleteUserImage(): void {  
        this._alert.Confirm(`Remove <b>User Image</b> ?`, 'warning', 'fa-solid fa-trash-can').then(response => {
            if(response) {
                if(this._staticLogin) {
                    this._userImageStatic = '';
                }

                else {
                    this.onDeleteUserImage.emit();
                }
            }
        });   
    }


    /** */
    public OpenSideNav(): void { 
        if(!isMenuOpenSIGNAL()) {
            this._sidenav().Toggle(); 
        }
    }


    /** */
    public CloseSideNav(): void { 
        if(isMenuOpenSIGNAL()) {
            this._sidenav().Toggle(); 
        }
    }


    /** */ 
    public StartJWT(validateEvery: number = 1000, diferenceToUpdate: number = 30): void {  
        if(!this._staticLogin) {
            if(Tools.IsOnlyWhiteSpace(this._jwtService.jwt)) {
                this._alert.Warning('The JWT has not been provided');
                return;
            }

            this._WatchJWT();
            this.onUpdateJWT.emit();
    
            clearInterval(this._startJWT$);
            this._startJWT$ = setInterval(() => { 
                const DIFERENCE = Math.abs(moment().diff(this._jwtService.expirationDate, 'minute')); 
    
                if (DIFERENCE <= diferenceToUpdate) {
                    this.onUpdateJWT.emit();
                }
            }, validateEvery);  
        } 
    }


    /** */ 
    protected _WatchJWT(): void {   
        if (this._jwtService.isExpired) {
            User.LogOut();
            return;
        }

        clearInterval(this._watchJWT$);
        this._watchJWT$ = setInterval(() => { 
            if (this._jwtService.isExpired) {
                clearInterval(this._watchJWT$);
                User.LogOut();
            } 
        }, 1000);   
    }


    /** */
    public UpdateJWT(jwt: string): void { 
        if(this._staticLogin) return;
        this._jwtService.UpdateJWT(jwt);
    }  


    /** */
    public StopJWT(): void {
        if(this._staticLogin) return;
        clearInterval(this._startJWT$); 
    }  


    /** */
    public UseStaticLogin(): IUserLogin { 
        User.Set({
            user:  'COERSystem',  
            role:  'Development', 
            fullName: 'COER System',
            email: 'coer.system@gmail.com',
            jwt: 'staticLogin'
        });  

        return User.Get() as IUserLogin;
    }
}