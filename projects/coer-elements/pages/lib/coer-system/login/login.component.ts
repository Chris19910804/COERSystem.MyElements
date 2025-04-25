import { Component, output, viewChild, WritableSignal } from '@angular/core';     
import { CoerTextBox } from 'coer-elements/components';
import { ILogIn } from 'coer-elements/interfaces';
import { isLoadingSIGNAL } from 'coer-elements/signals';
import { Tools } from 'coer-elements/tools';
declare const appSettings: any;

@Component({
    selector: 'login-page',
    templateUrl: './login.component.html', 
    styleUrl: './login.component.scss',
    standalone: false
})
export class LoginPage {   

    //appSettings 
    protected _appName = Tools.AvoidNull<string>(appSettings?.appInfo?.name, 'string');

    //Elements
    protected _inputUser = viewChild.required<CoerTextBox>('inputUser');
    protected _inputPassword = viewChild.required<CoerTextBox>('inputPassword');
    protected _inputRecovery = viewChild.required<CoerTextBox>('inputRecovery');

    //Signals
    protected _isLoading: WritableSignal<boolean> = isLoadingSIGNAL; 

    //Variables
    protected _user: string = '';
    protected _password: string = ''; 
    protected _remember: boolean = false;
    protected _show: 'LOGIN' | 'RECOVERY' = 'LOGIN';

    //Outputs 
    public onLogin = output<ILogIn>();
    public onRecovery = output<string>();

    //Generic Tools
    protected IsNotOnlyWhiteSpace = Tools.IsNotOnlyWhiteSpace;  

    //getter
    protected get _enableButton() {
        return Tools.IsNotOnlyWhiteSpace(this._user)
            && Tools.IsNotOnlyWhiteSpace(this._password)
            && this._password.length >= 6
    }

    //getter
    protected get _enableRecoveryButton() {
        return Tools.IsNotOnlyWhiteSpace(this._user) 
            && this._user.length >= 6
    }

    
    /** */
    protected __Login() {
        if (this._enableButton) {
            this.onLogin.emit({ 
                user: this._user, 
                password: this._password 
            });
        } 
    }


    /** */
    protected __Recovery() {
        if(this._enableRecoveryButton) {
            this.onRecovery.emit(this._user);
        }
    }


    /** */
    public async Show(view: 'LOGIN' | 'RECOVERY') {
        this._show = view;
        await Tools.Sleep(150);

        if(view === 'RECOVERY') {            
            this._inputRecovery().Focus();
        }

        else if (view === 'LOGIN') {
            this._inputUser().Focus();
        }
    }


    /** */
    public FocusUser() {
        this._inputUser().Focus();
    }


    /** */
    public FocusPassword() {
        this._inputPassword().Focus(true);
    }


    /** */
    public SetUser(user: string): void {
        this._user = user;
    }
}