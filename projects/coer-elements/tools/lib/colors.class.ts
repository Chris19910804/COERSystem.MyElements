import { colorsSIGNAL } from "coer-elements/signals";
import { IActionColors, IAppColors, IFixedColors } from "coer-elements/interfaces";
import { Tools } from "./tools";

export class Colors {

    public static get fixedColors(): IFixedColors {
        return {
            blue   : colorsSIGNAL().fixedColors.blue,
            gray   : colorsSIGNAL().fixedColors.gray,
            green  : colorsSIGNAL().fixedColors.green,
            yellow : colorsSIGNAL().fixedColors.yellow,
            red    : colorsSIGNAL().fixedColors.red,
            smoke  : colorsSIGNAL().fixedColors.smoke,
            black  : colorsSIGNAL().fixedColors.black,
            orange : colorsSIGNAL().fixedColors.orange,
            white  : colorsSIGNAL().fixedColors.white,
            purple : colorsSIGNAL().fixedColors.purple
        }
    }

    public static get actionColors(): IActionColors {
        return {
            primary     : colorsSIGNAL().actionColors.primary,      
            secondary   : colorsSIGNAL().actionColors.secondary, 
            success     : colorsSIGNAL().actionColors.success,
            warning     : colorsSIGNAL().actionColors.warning, 
            danger      : colorsSIGNAL().actionColors.danger, 
            navigation  : colorsSIGNAL().actionColors.navigation, 
            information : colorsSIGNAL().actionColors.information
        }
    }
     
    public static get appColors(): IAppColors {
        return {
            breadcrumbs  : colorsSIGNAL().appColors.breadcrumbs,
            background   : colorsSIGNAL().appColors.background,  
            containers   : colorsSIGNAL().appColors.containers,
            sidenav      : colorsSIGNAL().appColors.sidenav,  
            sidenavText  : colorsSIGNAL().appColors.sidenavText, 
            sidenavActive: colorsSIGNAL().appColors.sidenavActive,
            toolbar      : colorsSIGNAL().appColors.toolbar,  
            toolbarText  : colorsSIGNAL().appColors.toolbarText
        } 
    }
    
    
    public static ToHexadecimal(r: number, g: number, b: number, a?: number): string {
        const red   = `${Number(r).toString(16).padStart(2, '0')}`;
        const green = `${Number(g).toString(16).padStart(2, '0')}`;
        const blue  = `${Number(b).toString(16).padStart(2, '0')}`;
        const alpha = (Tools.IsNotNull(a)) ? Math.round(Number(a) * 255).toString(16).padStart(2, '0') : '';
        return `#${red}${green}${blue}${alpha}`.toLowerCase();
    }


    /** Returns a random color in hexadecimal 
    public static GetRandomColorHex = (): string => "#xxxxxx".replace(/x/g, () => (Math.random() * 16 | 0).toString(16)); */


    /** Returns the number of colors requested */
    public static GetColorHexList(quantity: number): string[] {
        const colors: string[] = [];
        let counter: number = 0;

        while (counter < quantity) {
            for (const color in this.fixedColors) {
                colors.push(color);
                if (++counter === quantity) break;
            }
        }

        return colors;
    }


    /** Returns the number of colors requested with opacity 
    public static GetColorRGBList(quantity: number): string[] {
        const colors: string[] = [];

        let alpha: number = 1.0;
        let counter: number = 0;
        let lastColor = [...Array.from(this.ColorsRGB.keys())].pop();

        while (counter < quantity) {
            for (const [color, value] of this.ColorsRGB.entries()) {
                colors.push(`rgba(${value[0]}, ${value[1]}, ${value[2]}, ${alpha})`);

                if (color === lastColor) alpha -= 0.2;
                if (++counter === quantity) break;
            }
        }

        return colors;
    } */
}