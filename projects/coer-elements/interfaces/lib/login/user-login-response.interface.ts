export interface IUserLoginResponse { 
    userId?: number; 
    user: string;
    userNumber?: string;  
    role: string;
    fullName?: string;
    nickname?: string;  
    email?: string;
    roles?: string[];
    jwt?: string;
    remember?: boolean;
}