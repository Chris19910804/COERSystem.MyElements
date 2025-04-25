import { HomeModule } from './modules/home/home.module'; 
import { Component, inject, viewChild } from '@angular/core'; 
import { Router } from '@angular/router';
import { IFile, ILogIn, IMenu, IPatch, IMenuToolbar, IUserLogin } from 'coer-elements/interfaces';
import { Breadcrumbs, CoerAlert, Source, Tools, User } from 'coer-elements/tools'; 
import { isLoadingSIGNAL } from 'coer-elements/signals'; 
import { COERSystem } from 'coer-elements/pages';   
import { AuthService, ProfileService } from '@Config/Services'; 
import environment from '@Config/Environment';
import { STATIC_NAVIGATION } from './app.navigation';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [HomeModule],
    templateUrl: './app.component.html'
})
export class AppComponent {  
      
    //Elements
    protected COERSystem = viewChild.required<COERSystem>('COERSystem');
    
    //Injections
    private readonly alert          = inject(CoerAlert);
    private readonly router         = inject(Router); 
    private readonly authService    = inject(AuthService);
    private readonly profileService = inject(ProfileService); 
    
    //appConfig
    protected staticLogin = environment.login.staticLogin;
    
    //Variables
    protected user: IUserLogin | null = null;
    protected userImage: string | null = null; 
    protected userRoles: string[] = []; 
    protected navigation: IMenu[] = [];  
        
    protected toolbarMenu: IMenuToolbar[] = [
        { label: 'Profile',        icon: 'fa-solid fa-user' },
        { label: 'Reset Password', icon: 'fa-solid fa-lock' }
    ];

    constructor() {  
        if(User.LogIn()) { 
            isLoadingSIGNAL.set(true);
    
            //Get User
            this.user = User.Get() as IUserLogin;  
            this.userRoles = this.user?.roles || [];
    
            //Get Navigation
            this.GetNavigation(this.user?.role).then(() => {
                
                const creadcrumb = Breadcrumbs.GetLast();
                if(Tools.IsNotNull(creadcrumb)) {
                    this.router.navigateByUrl(creadcrumb!.path!);
                }
                
                isLoadingSIGNAL.set(false);
            }); 
    
            //Get User image
            this.GetUserImage();
    
            //Start JWT
            Tools.Sleep().then(() => this.COERSystem().StartJWT()); 
        }
        
        else {
            Source.Reset();  
            
            if(this.staticLogin) {
                this.LogInStatic();
            }

            else {
                const user = User.Get();    
                            
                if(user?.remember) {
                    Tools.Sleep(1000).then(() => this.COERSystem().SetUser(user?.user));
                }
            } 
        } 
    }

    /** */
    protected async LogIn(login: ILogIn) {    
        try {
            isLoadingSIGNAL.set(true);                 
            const loginResponse = await this.authService.LogIn(login);
                 
            if (Tools.IsNotNull(loginResponse) && (loginResponse.userId > 0)) {
                this.user = loginResponse;
                
                User.Set({
                    userId:     loginResponse.userId,
                    user:       loginResponse.user, 
                    userNumber: loginResponse.userNumber, 
                    role:       loginResponse.role, 
                    fullName:   loginResponse.fullName,
                    nickname:   loginResponse.nickname,
                    email:      loginResponse.email,
                    roles:      loginResponse.roles,
                    jwt:        loginResponse.jwt,
                    remember:   true,
                });                   
                     
                this.userRoles = loginResponse.roles;
                await this.GetNavigation(loginResponse.role);
                this.router.navigateByUrl('/home');

                this.alert.Info(loginResponse.message, environment.appInfo.name, 'fa-solid fa-laptop-code');
                this.GetUserImage(); 
                this.COERSystem().StartJWT();        
            }
    
            else {
                this.alert.Warning(loginResponse.message, 'No access', 'fa-hand fa-solid');
                this.COERSystem().FocusPassword();
            }  
        } 
        
        catch (message) {
            console.error(message); 
        }
            
        finally {
            isLoadingSIGNAL.set(false);  
        } 
    } 


    /** */
    protected async LogInStatic() {    
        isLoadingSIGNAL.set(true);   
        await Tools.Sleep();
            
        this.user = this.COERSystem().UseStaticLogin();    
        await this.GetNavigation(this.user!.role);
        this.router.navigateByUrl('/home'); 
        
        this.alert.Info(this.user?.fullName, environment.appInfo.name, 'fa-solid fa-laptop-code'); 
        isLoadingSIGNAL.set(false);  
    } 
        
        
    /** */
    protected async RecoveryPassword(recovery: string) { 
        try { 
            isLoadingSIGNAL.set(true); 
                
            const message = await this.authService.RecoveryPassword(recovery);  
            this.alert.Success(message, recovery, 'fa-solid fa-envelope');
            this.COERSystem().Show('LOGIN');
                
            isLoadingSIGNAL.set(false);
            await Tools.Sleep();
            this.COERSystem().FocusPassword(); 
        } 
            
        catch (message) {
            console.error(message); 
            isLoadingSIGNAL.set(false);
        } 
    }
          
    
    /** */
    private async GetNavigation(role: string | null | undefined = null) {
        try {
            await Tools.Sleep(); 
            if(environment.navigation.staticMenu) {   
                this.navigation = STATIC_NAVIGATION; 
            }

            else if (Tools.IsNotOnlyWhiteSpace(role)) {                 
                const project = environment.appInfo.name;   
                this.navigation = await this.authService.GetNavigationByRole(project, role!);    
                await Tools.Sleep();             
            }
        } 
        
        catch(message) {
            console.log(message);
        }
    }  
    
    
    /** */
    private async GetUserImage() { 
        if(!this.staticLogin) {
            this.userImage = 'LOADING';        
            const user = Tools.AvoidNull(this.user?.user, 'string');        
            const [image] = await this.profileService.GetImagesUser(user); 
            this.userImage = image?.base64;     
        }          
    } 
    
    
    /** */
    protected async UploadUserImage(image: IFile) { 
        try {
            if(Tools.IsNotNull(image)) {
                isLoadingSIGNAL.set(true); 
                await this.profileService.UploadImageUser(this.user!.user, image.file);
                this.userImage = image.base64;
                this.alert.Success(`<b>${image.file.name}</b> has been updated`);  
            } 
        }
    
        catch (message) {
            console.error(message);
        }
    
        finally {
            isLoadingSIGNAL.set(false);
        }
    }
    
    
    /** */
    protected async DeleteUserImage() {   
        try {            
            isLoadingSIGNAL.set(true); 
            await this.profileService.DeleteMainImageUser(this.user!.user);
            await this.GetUserImage();            
            this.alert.Success(`User image has been removed`);
            
        }
            
        catch (message) {
            console.error(message);
        }
            
        finally {
            isLoadingSIGNAL.set(false);
        }
    }
    
    
    /** */
    protected async ResetPassword(passsword: string) { 
        try {            
            isLoadingSIGNAL.set(true);
        
            const login: ILogIn = {
                user: this.user!.user!,
                password: passsword
            }
                
            await this.authService.SetPassword(login);  
            this.alert.Success('Password has been updated', this.user!.user, 'fa-solid fa-lock');
        } 

        catch (message) {
            console.error(message);
        }

        finally {
            this.COERSystem().CloseModal();
            await Tools.Sleep(1000);
            isLoadingSIGNAL.set(false);
        }
    } 
    
    
    /** */
    protected async UpdateProfile(profile: IUserLogin) {   
        try {
            isLoadingSIGNAL.set(true);
            const USER = this.user!;
            let isUpdated = false; 
              
            if (USER.role != profile.role) {
                await this.profileService.SetMainUsersRole(USER.user, profile.role);
                await this.GetNavigation(profile.role);
                this.router.navigateByUrl('/home');
                isUpdated = true;
            } 
            
            if (USER.nickname != profile.nickname) {
                const patch: IPatch[] = [{
                    op: 'replace',
                    path: '/nickname',
                    value: profile.nickname
                }];

                await this.profileService.PatchUserIdentity(USER.user, patch); 
                isUpdated = true;
            }

            if(isUpdated) { 
                this.alert.Success('User has been updated', this.user!.fullName);
            }

            this.user = Tools.BreakReference(profile);
            User.Set(this.user);
        }
            
        catch (message) {
            console.error(message);  
        }
            
        finally {
            this.COERSystem().CloseModal();
            await Tools.Sleep(1000);
            isLoadingSIGNAL.set(false);
        }
    }  


    /** */
    protected UpdateJWT() { 
        this.authService.UpdateJWT()
        .then(jwt => this.COERSystem().UpdateJWT(jwt))
        .catch(() => this.COERSystem().StopJWT());
    }
}