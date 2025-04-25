import { inject, Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { DateTime, Tools, User } from 'coer-elements/tools';  

@Injectable({
    providedIn: 'root'
})
export class JWTService {

    private readonly jwtService = inject(JwtHelperService);
    
    
    /** */
    public get jwt(): string { 
        return User.Get()?.jwt || '';
    }

    
    /** */
    public get expirationDate(): string | null { 
        return Tools.IsNotOnlyWhiteSpace(this.jwt) && Tools.IsNotNull(this.jwtService.getTokenExpirationDate(this.jwt))
            ? DateTime.GetFormatDB(this.jwtService.getTokenExpirationDate(this.jwt)!)
            : null
    }


    /** */
    public get isExpired(): boolean {  
        return Tools.IsNotOnlyWhiteSpace(this.jwt)
            ? this.jwtService.isTokenExpired(this.jwt)
            : true
    }


    /** */
    public UpdateJWT(jwt: string): void {  
        let user = User.Get();

        if (user) {
            user = Object.assign(user, { jwt });
            User.Set(user);
        } 
    }
}