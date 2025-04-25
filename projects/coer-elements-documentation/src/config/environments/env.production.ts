/**********  PRODUCTION ***********/
import { Tools } from "coer-elements/tools";
declare const appSettings: any;

export const environment = {
    production: true,
    appInfo: {
        id:        Tools.AvoidNull<number>(appSettings.appInfo.id,        'number'),
        name:      Tools.AvoidNull<string>(appSettings.appInfo.name,      'string'),
        logoPath:  Tools.AvoidNull<string>(appSettings.appInfo.logoPath,  'string'),
        logoWidth: Tools.AvoidNull<string>(appSettings.appInfo.logoWidth, 'string'),
        showLogo:  Tools.AvoidNull<string>(appSettings.appInfo.showLogo,  'string')
    },
    webAPI: { 
        mySystem:   Tools.AvoidNull<string>(appSettings.webAPI.production.mySystem,   'string'),
        myBusiness: Tools.AvoidNull<string>(appSettings.webAPI.production.myBusiness, 'string')
    },
    login: {
        staticLogin: Tools.AvoidNull<boolean>(appSettings.login.staticLogin, 'boolean')
    },
    navigation: {
        staticMenu: Tools.AvoidNull<boolean>(appSettings.navigation.staticMenu, 'boolean')
    }
};