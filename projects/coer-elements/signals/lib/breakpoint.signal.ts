import { computed, signal } from '@angular/core'; 

//computed
const BREAKPOINT = computed<'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'>(() => {
    if (window.innerWidth < 576) return 'xs';
    else if (window.innerWidth >= 576 && window.innerWidth < 768) return 'sm';
    else if (window.innerWidth >= 768 && window.innerWidth < 992) return 'md';
    else if (window.innerWidth >= 992 && window.innerWidth < 1200) return 'lg';
    else if (window.innerWidth >= 1200 && window.innerWidth < 1400) return 'xl';
    else return 'xxl';
});

export const breakpointSIGNAL = signal<'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'>(BREAKPOINT()); 