import moment from "moment";
import { Tools } from "./tools";

export class DateTime {
    /** Get UTC Offset */
    public static GetOffset(): number {
        return moment().utcOffset();
    }


    /** YYYY-MM-DD HH:mm:ss */
    public static GetCurrentDateTime(): string { 
        return moment().parseZone().local(true).format('YYYY-MM-DD HH:mm:ss');
    }


    /** YYYY-MM-DD HH:mm:ss */
    public static GetFormatDB(date: string | Date | moment.Moment): string { 
        date = new Date(date.toString());
        return moment(date).format('YYYY-MM-DD HH:mm:ss');
    }


    /** Convert UTC Date to Local Zone */
    public static ToLocalZone(date: string | Date | moment.Moment): string {
        date = DateTime.GetFormatDB(date);
        return moment(date).add(DateTime.GetOffset(), 'minutes').format('YYYY-MM-DD HH:mm:ss');
    }


    /** Convert Local Zone Date to UTC */
    public static ToUTC(date: string | Date | moment.Moment): string {
        date = DateTime.GetFormatDB(date);
        return moment(date).subtract(DateTime.GetOffset(), 'minutes').format('YYYY-MM-DD HH:mm:ss');
    }


    /** MMM, DD YYYY */
    public static GetDateFormat(date: string | Date | moment.Moment): string { 
        date = DateTime.GetFormatDB(date);
        return moment(date).parseZone().local(true).format('MMM, DD YYYY');
    }


    /** MMM, DD YYYY at hh:mm a */
    public static GetDateTimeFormat(date: string | Date | moment.Moment): string { 
        date = DateTime.GetFormatDB(date);
        return moment(date).parseZone().local(true).format('MMM, DD YYYY - hh:mm a').replace('-', 'at');
    }


    /** */
    public static IsValidDate(date: string | Date | moment.Moment): boolean {  
        if (Tools.IsOnlyWhiteSpace(date)) return false;      
        date = DateTime.GetFormatDB(date);        
        return moment(date).isValid();
    }


    /** */
    public static SetFirstHour(date: string | Date | moment.Moment = '', format: 'database' | 'display' = 'database'): string {  
        if (Tools.IsOnlyWhiteSpace(date)) date = moment();    
        
        else {
            date = DateTime.GetFormatDB(date); 
            date = moment(date);
        }     

        date = date.set('hour', 0).set('minute', 0).set('second', 0).set('millisecond', 0);
        
        return (format === 'database') 
            ? DateTime.GetFormatDB(date) 
            : DateTime.GetDateFormat(date);
    }


    /** */
    public static SetLastHour(date: string | Date | moment.Moment = '', format: 'database' | 'display' = 'database'): string {  
        if (Tools.IsOnlyWhiteSpace(date)) date = moment();    
        
        else {
            date = DateTime.GetFormatDB(date); 
            date = moment(date);
        }     

        date = date.set('hour', 23).set('minute', 59).set('second', 59).set('millisecond', 59);
        
        return (format === 'database') 
            ? DateTime.GetFormatDB(date) 
            : DateTime.GetDateFormat(date);
    } 
}