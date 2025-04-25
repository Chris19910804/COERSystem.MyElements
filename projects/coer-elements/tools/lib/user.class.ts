import { IUserLoginResponse } from "coer-elements/interfaces";
import { Tools } from "./tools";  

export class User {
      
    private static readonly storage = 'COER-System';

    /** */    
    public static Set(user: IUserLoginResponse): void { 
        let storage = localStorage.getItem(this.storage) as any;  

        if (storage) {
            storage = JSON.parse(storage);  
            user = Object.assign({}, storage.user, user);          
            storage = Object.assign({}, storage, { user });
        }

        else {
            storage = Object.assign({}, storage, { user });
        }

        localStorage.setItem(this.storage, JSON.stringify(storage));
    }
     

    /** */
    public static Get(): IUserLoginResponse | null {
        let storage = localStorage.getItem(this.storage) as any;

        if (storage) {
            storage = JSON.parse(storage);
            
            if (storage.hasOwnProperty('user')) {
                return {
                    userId:     Tools.AvoidNull<number>(storage.user?.userId,     'number'),
                    user:       Tools.AvoidNull<string>(storage.user?.user,       'string'),
                    userNumber: Tools.AvoidNull<string>(storage.user?.userNumber, 'string'),
                    role:       Tools.AvoidNull<string>(storage.user?.role,       'string'),
                    fullName:   Tools.AvoidNull<string>(storage.user?.fullName,   'string'),
                    nickname:   Tools.AvoidNull<string>(storage.user?.nickname,   'string'), 
                    email:      Tools.AvoidNull<string>(storage.user?.email,      'string'),
                    roles:      Tools.IsNotNull(storage.user?.roles) ? storage.user.roles : [],
                    jwt:        Tools.AvoidNull<string>(storage.user?.jwt,        'string'),
                    remember:   Tools.AvoidNull<boolean>(storage.user?.remember,  'boolean')
                };
            }
        }

        return null;
    }
     

    /** */
    public static LogIn(): boolean {
        let storage = localStorage.getItem(this.storage) as any; 
        storage = JSON.parse(storage); 

        return Tools.IsNotNull(storage)
            && Tools.IsNotNull(storage?.user)
            && Tools.IsNotOnlyWhiteSpace(storage?.user?.jwt);
    }


    /** */
    public static LogOut(): void {
        let storage = localStorage.getItem(this.storage) as any; 

        sessionStorage.removeItem(this.storage);
        localStorage.removeItem(this.storage); 

        if (Tools.IsNotOnlyWhiteSpace(storage)) {
            storage = JSON.parse(storage); 

            const STORAGE_USER = storage?.user;
            const user = STORAGE_USER?.user;
            const remember = Tools.AvoidNull<boolean>(STORAGE_USER?.remember, 'boolean');
             
            if (remember && Tools.IsNotOnlyWhiteSpace(user)) {
                localStorage.setItem(this.storage, JSON.stringify({ user: { user, remember }})); 
            }
        } 
        
        document.location.href = '/';
    }  
}