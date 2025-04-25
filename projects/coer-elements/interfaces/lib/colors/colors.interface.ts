import { IActionColors } from "./action-colors.interface";
import { IAppColors } from "./app-colors.interface";
import { IFixedColors } from "./fixed-colors.interface";

export interface IColors {
    fixedColors:  IFixedColors;
    actionColors: IActionColors;
    appColors:    IAppColors;
} 