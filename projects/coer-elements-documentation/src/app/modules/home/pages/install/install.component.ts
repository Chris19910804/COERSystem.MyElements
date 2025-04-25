import { Component } from '@angular/core'; 
import { Page } from 'coer-elements/tools';    

@Component({
    selector: 'install-page',
    templateUrl: './install.component.html',
    styleUrl: './install.component.scss', 
    standalone: false
})
export class InstallPage extends Page {    

    protected expanded: boolean = false; 
     
    constructor() { 
        super('Install'); 
    }      


    /** */
    protected get libs(): string[] {
        return [
            'npm install bootstrap --save', 
            'npm install @types/bootstrap --save-dev', 
            'npm install bootstrap-icons --save',
            'npm install moment --save',
            'npm install save sweetalert2 --save',
            'npm install @fortawesome/fontawesome-free --save',
            'npm install file-saver --save',
            'npm install @types/file-saver --save-dev',
            'npm install coer-elements --save',
            'ng add @angular/material' 
        ];
    } 


    /** */
    protected get config() {
        return { 
            appSettings: `  const appSettings = {
      appInfo: {
          id: 1,
          name: 'Project Name',
      },
      webAPI: {
         
      },
      logIn: {
          useCredentials: false,
          user: 'COERSystem'
      },
      files: {
          images: {
              noImage: 'assets/images/no_image.png',
              noUserImage: 'assets/images/no_user_image.png',
              maxMB: 4
          }
      }
  }`,  
            stylesScripts: `  "assets": ["src/favicon.ico", "src/assets",
    { "glob": "**/*", "input": "./node_modules/coer-elements/images", "output": "/coer-elements/images" }
  ],
  "styles": [
    "@angular/material/prebuilt-themes/azure-blue.css",
    "node_modules/@fortawesome/fontawesome-free/css/all.min.css",
    "node_modules/bootstrap/dist/css/bootstrap.min.css",
    "node_modules/bootstrap-icons/font/bootstrap-icons.css",
    "node_modules/coer-elements/styles/coer-elements.css",
    "src/styles.scss"
  ],
  "scripts": [ 
    "node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"
  ],
  "stylePreprocessorOptions": {
    "includePaths": ["."]
  },
  "allowedCommonJsDependencies": [
    "core-js", "moment", "sweetalert2"
  ]
`
        }
    }
} 