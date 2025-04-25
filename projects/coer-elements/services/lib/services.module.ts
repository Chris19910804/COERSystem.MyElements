import { NgModule } from '@angular/core'; 

//Services
import { JWTService } from './jwt.service';

@NgModule({    
    providers: [  
        JWTService 
    ]
})
export class ServicesModule { }