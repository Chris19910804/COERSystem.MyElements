export interface IMenuAccess { 
    module: string | null;
    submodule: string | null;
    page: string;
    path: string;
    readonly: boolean;
}