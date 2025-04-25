/** UserLoginResponseDTO */
export interface IUserLoginResponse { 
    userId: number; 
    user: string; 
    userNumber: string; 
    role: string;
    fullName: string;
    nickname: string;
    email: string;
    jwt: string; 
    message: string;
    roles: string[];
}