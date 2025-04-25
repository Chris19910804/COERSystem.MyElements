import { Tools } from "coer-elements/tools";

declare global {
    interface String {

        /** */
        removeAccents(): string;

        /** Clean extra whitespaces */
        cleanUpBlanks(): string;

        /** Set First Char To Lower */
        firstCharToLower(): string;

        /** Set First Char To Upper */
        firstCharToUpper(): string;

        /** Returns true if the value is null or undefined or contains only whitespace, false otherwise */
        isOnlyWhiteSpace(): boolean;

        /** Returns true if has string value and is not only whitespace, false otherwise */
        isNotOnlyWhiteSpace(): boolean;

        /** Returns true if value is equals */
        equals(value: string, sensitive: boolean, removeWhiteSpaces: boolean): boolean;
    }
}


String.prototype.removeAccents = function(): string { 
    return Tools.RemoveAccents(this.toString());
};

 
String.prototype.cleanUpBlanks = function(): string {
    return Tools.CleanUpBlanks(this.toString());
}; 


String.prototype.firstCharToLower = function(): string {
    return Tools.FirstCharToLower(this.toString());
}; 


String.prototype.firstCharToUpper = function(): string {
    return Tools.FirstCharToUpper(this.toString());
}; 


String.prototype.isOnlyWhiteSpace = function(): boolean {
    return Tools.IsOnlyWhiteSpace(this);
}

String.prototype.isNotOnlyWhiteSpace = function(): boolean {
    return Tools.IsNotOnlyWhiteSpace(this);
}

String.prototype.equals = function(value: string, sensitive: boolean = false, removeWhiteSpaces: boolean = false): boolean { 
    if (Tools.IsNotNull(value) && typeof value === 'string') {  
        let _this = this;

        if (!sensitive) {
            _this = _this.toUpperCase();
            value = value.toUpperCase(); 
        }

        if (removeWhiteSpaces) {
            _this = _this.replaceAll(' ', '');
            value = value.replaceAll(' ', ''); 
        }

        return _this === value;
    } 

    return false; 
}

export {};