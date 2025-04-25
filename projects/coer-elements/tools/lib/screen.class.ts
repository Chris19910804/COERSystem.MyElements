
import { IScreenSize } from "coer-elements/interfaces";
import { Observable } from "rxjs";

export class Screen {

    public static get WINDOW_WIDTH(): number {
        return window.innerWidth;
    }


    public static get WINDOW_HEIGHT(): number {
        return window.innerHeight;
    }


    public static get DEVICE_WIDTH(): number {
        return window.screen.width;
    }


    public static get DEVICE_HEIGHT(): number {
        return window.screen.height;
    }


    public static get BREAKPOINT(): 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' {
        if (window.innerWidth < 576) return 'xs';
        else if (window.innerWidth >= 576 && window.innerWidth < 768) return 'sm';
        else if (window.innerWidth >= 768 && window.innerWidth < 992) return 'md';
        else if (window.innerWidth >= 992 && window.innerWidth < 1200) return 'lg';
        else if (window.innerWidth >= 1200 && window.innerWidth < 1400) return 'xl';
        else return 'xxl';
    }


    /** */
    public static Resize = new Observable<IScreenSize>(subscriber => {
        const handleResize = () => { 
            subscriber.next({ 
                width: window.innerWidth, 
                height: window.innerHeight, 
                breakpoint: this.BREAKPOINT 
            }); 
        };

        window.addEventListener("resize", handleResize);
        window.addEventListener("load", handleResize);

        return () => { 
            window.removeEventListener("resize", handleResize); 
            window.removeEventListener("load", handleResize); 
        };
    });


    /** */
    public static BackButtonBrowser = new Observable<string>(subscriber => {
        const handlePopState = (popStateEvent: PopStateEvent) => { 
            if (popStateEvent.state && popStateEvent.target) { 
                subscriber.next((popStateEvent.target as Window).location.href); 
            } 
        }; 
        
        window.addEventListener('popstate', handlePopState); 
        
        return () => { 
            window.removeEventListener('popstate', handlePopState); 
        };
    });
}