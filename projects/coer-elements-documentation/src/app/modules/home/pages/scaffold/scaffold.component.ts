import { Component } from '@angular/core'; 
import { DownloadService } from '@Config/Services';
import { IScaffold } from '@Interfaces';
import { Page, Tools } from 'coer-elements/tools';       

@Component({
    selector: 'scaffold-page',
    templateUrl: './scaffold.component.html', 
    styleUrl: './scaffold.component.scss', 
    standalone: false
})
export class ScaffoldPage extends Page {   

    protected sacaffoldList: IScaffold[] = [];

    constructor(private download: DownloadService) { 
        super('Scaffold-DbContext') 
    }    


    /** */
    protected override RunPage() {
        this.GetScaffoldList();
    }  
    
    
    /** */
    protected GetScaffoldString(scaffold: IScaffold) {
        return `Scaffold-DbContext`
            + ` Name=${scaffold.name}`
            + ` -Provider ${scaffold.provider}`
            + ` -StartupProject ${scaffold.apiName}`
            + ` -Project ${scaffold.project}`
            + ` -Namespace ${scaffold.namespace}`
            + ` -OutputDir ${scaffold.output}`
            + ` -ContextNamespace ${scaffold.contextNamespace}`
            + ` -ContextDir ${scaffold.contextOutput}`
            + ` -Context ${scaffold.contextName}`
            + ` -NoOnConfiguring`
            + ` -Force`;
    }


    /** */
    private GetScaffoldList() { 
        this.sacaffoldList = [
            {
                name: 'MySystem',
                apiName: 'API.MySystem',
                provider: 'Microsoft.EntityFrameworkCore.SqlServer',
                project: 'Repository',
                namespace: 'Repository.Contexts.MySystem',
                output: 'Contexts/MySystem',
                contextName: 'MySystemContext',
                contextNamespace: 'Repository.Contexts.MySystem',
                contextOutput: 'Contexts/MySystem' 
            },
            {
                name: 'MyBusiness',
                apiName: 'API.MyBusiness',
                provider: 'Microsoft.EntityFrameworkCore.SqlServer',
                project: 'Repository',
                namespace: 'Repository.Contexts.MyBusiness',
                output: 'Contexts/MyBusiness',
                contextName: 'MyBusinessContext',
                contextNamespace: 'Repository.Contexts.MyBusiness',
                contextOutput: 'Contexts/MyBusiness' 
            }
        ];
    }
    
    
    /** */
    protected async Copy(scaffold: IScaffold) {
        const script = this.GetScaffoldString(scaffold);

        try {
            await navigator.clipboard.writeText(script);
            this.alert.Info('Script copied', scaffold.name, 'bi bi-clipboard-fill');
        } 
        
        catch { 
            this.alert.Warning('Unable to copy to clipboard', scaffold.name, 'bi bi-clipboard-fill');
        }        
    }


    /** */
    protected async Download() { 
        try {
            this.isLoading = true;
            const folio = 'COER-SCAFFOLD'; 
            await this.download.FormatTXT(folio, folio);
             
        } 
        
        catch (message) { 
            console.error(message);
        }      
        
        finally {
            await Tools.Sleep(3000);
            this.isLoading = false;
        }
    }
}