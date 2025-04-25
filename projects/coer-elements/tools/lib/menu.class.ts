import { IMenuAccess, IMenuOptionSelected } from "coer-elements/interfaces"; 
import { navigationSIGNAL } from "coer-elements/signals";
import { Tools } from "./tools";

export class Menu {

    private static readonly storage = 'COER-System';

    /** */
    public static SetSelectedOption(menu: IMenuOptionSelected): void {
        let storage = sessionStorage.getItem(this.storage) as any;
        if (storage) storage = JSON.parse(storage);
        storage = Object.assign({}, storage, { menu });
        sessionStorage.setItem(this.storage, JSON.stringify(storage));
    }


    /** */
    public static GetSelectedOption(): IMenuOptionSelected | null {
        let storage = sessionStorage.getItem(this.storage) as any;

        if (storage) {
            storage = JSON.parse(storage);

            if (storage.hasOwnProperty('menu')) {
                return storage.menu;
            }
        }

        return null;
    }


    public static GetMenuAccess = (): IMenuAccess[] => {
        const menuAccess: IMenuAccess[] = [];
        
        //LV1
        for (const lv1 of navigationSIGNAL()) {
      
          //LV1 - Page
          if (Tools.IsNotOnlyWhiteSpace(lv1.path) && Tools.IsNull(lv1.items)) {
            menuAccess.push({ 
              module: null, 
              submodule: null, 
              page: lv1.label, 
              path: lv1.path!,
              readonly: Tools.IsNotNull(lv1?.readonly) ? lv1.readonly! : true 
            });
          } 
      
          //LV1 - Module
          else if (Tools.IsOnlyWhiteSpace(lv1.path) && Tools.IsNotNull(lv1.items)) {       
            
            //LV2
            for (const lv2 of lv1.items!) {
              
              //LV2 - Page
              if (Tools.IsNotOnlyWhiteSpace(lv2.path) && Tools.IsNull(lv2.items)) {
                menuAccess.push({
                  module: lv1.label, 
                  submodule: null, 
                  page: lv2.label, 
                  path: lv2.path!,
                  readonly: Tools.IsNotNull(lv2?.readonly) ? lv2.readonly! : true 
                });
              } 
      
              //LV2 - Submodule
              else if (Tools.IsOnlyWhiteSpace(lv2.path) && Tools.IsNotNull(lv2.items)) {
      
                //LV3
                for(const lv3 of lv2.items!) {
                  
                  //LV3 Page
                  if (Tools.IsNotOnlyWhiteSpace(lv3.path) && Tools.IsNull(lv3.items)) {
                    menuAccess.push({ 
                      module: lv1.label, 
                      submodule: lv2.label, 
                      page: lv3.label, 
                      path: lv3.path!,
                      readonly: Tools.IsNotNull(lv3?.readonly) ? lv3.readonly! : true 
                    });
                  } 
                }
              }
            }
          } 
        } 
      
        return menuAccess;
    }
}