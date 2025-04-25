//import { Tools } from "coer-elements/tools";
//
//declare global {
//    interface Object {
//       
//        /** Avoid Null value */
//        AvoidNull<T>(type: 'string' | 'number' | 'boolean' | null): T; 
//
//        /** Get properties of an object */
//        GetPropertyList(): string[];
//
//        /** Break reference of a object or array */
//        BreakReference<T>(object: T): T;
//    }
//}
//
//Object.prototype.AvoidNull = function<T>(type: 'string' | 'number' | 'boolean' | null = null): T {
//    return Tools.AvoidNull<T>(this as T, type);
//}
//
//Object.prototype.GetPropertyList = function(): string[] {
//    return Tools.GetPropertyList(this);
//}
//
//Object.prototype.BreakReference = function<T>(): T {
//    return Tools.BreakReference<T>(this as T);
//}

export {};