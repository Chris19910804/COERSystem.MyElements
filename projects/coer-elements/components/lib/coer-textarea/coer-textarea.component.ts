import { Component, computed, ElementRef, input, Input, OnInit, output, signal, viewChild } from '@angular/core';
import { CONTROL_VALUE, ControlValue, Tools } from 'coer-elements/tools';

@Component({
    selector: 'coer-textarea',
    templateUrl: './coer-textarea.component.html',
    styleUrl: './coer-textarea.component.scss',
    providers: [CONTROL_VALUE(CoerTextarea)],
    standalone: false
})
export class CoerTextarea extends ControlValue implements OnInit {

    //Elements 
    protected _coerTextBox = viewChild.required<ElementRef>('coerTextArea');
    
    //Variables 
    protected override _value: string | number = '';
    protected _id: string = Tools.GetGuid('coer-textArea');
    protected _isLoadingEvent = signal<boolean>(false);
    protected _htmlElement!: HTMLInputElement;

    //Inputs 
    public id           = input<string>('');
    public label        = input<string>('');
    public placeholder  = input<string>('');
    public textPosition = input<'left' | 'center' | 'right'>('left');
    public minLength    = input<number | string>(0);
    public maxLength    = input<number | string>(2500);
    public isInvalid    = input<boolean>(false);
    public isValid      = input<boolean>(false); 
    public resize       = input<boolean>(false);
    public showFooter   = input<boolean>(true); 
    public isLoading    = input<boolean>(false);
    public isDisabled   = input<boolean>(false);
    public isReadonly   = input<boolean>(false);
    public isInvisible  = input<boolean>(false); 
    public width        = input<string>('100%');
    public minWidth     = input<string>('190px');
    public maxWidth     = input<string>('100%'); 
    public height       = input<string>('80px'); 
    public marginTop    = input<string>('0px');
    public marginRight  = input<string>('0px');
    public marginBottom = input<string>('0px');
    public marginLeft   = input<string>('0px');

    @Input() set value(value: string | number | null | undefined) {
        if(Tools.IsNull(value)) value = '';
        this.SetValue(value);
    }

    //Outputs
    public onInput = output<string>();

    ngOnInit() {
        this._SetEvents();
    }


    //getter
    public get value(): string {
        return Tools.IsNotNull(this._value) ? String(this._value) : '';
    }


    //getter
    protected get footer() {
        return `${Tools.IsNotNull(this._value) ? String(this._value).length : '0' } / ${this.maxLength()}`;
    }


    //computed
    protected _isEnable = computed<boolean>(() => {
        return !this.isDisabled() && !this.isLoading() && !this.isReadonly();
    });


    //computed
    protected floatLabel = computed<'auto' | 'always'>(() => {
        return this.label() == '' ? 'always' : 'auto'
    });


    //computed
    protected paddingRight = computed(() => {
        return this.isInvalid() || this.isValid()
            ? '18px' : '0px';
    });


    /** */
    private _SetEvents(): void {
        Tools.Sleep().then(()=> {
            this._htmlElement = document.getElementById(this._id)! as HTMLInputElement;

            if (this._htmlElement) {
                this._htmlElement.addEventListener('focus', () => {
                    if (!this._isEnable()) this.Blur();
                });

                this._htmlElement.addEventListener('blur', () => this.Blur());

                this._htmlElement.addEventListener('input', () => {
                    Tools.Sleep().then(() => {
                        const value = this._coerTextBox().nativeElement.value;
                        if (this._isEnable()) this.onInput.emit(value);
                    });
                });


                this._htmlElement.addEventListener('paste', () => {
                    Tools.Sleep().then(() => {
                        this.SetValue(this._value.toString().trim());
                    });
                });
            }
        });
    }


    /** */
    public Focus(select: boolean = false, delay: number = 0): void {
        if(this._isLoadingEvent()) return;
        else this._isLoadingEvent.set(true);

        Tools.Sleep(delay).then(() => {
            if(this._isEnable()) {
                this._htmlElement.focus();
                if(select) this._htmlElement.select();
            }

            this._isLoadingEvent.set(false);
        });
    } 


    /** */
    public Blur(): void {
        if(this._isLoadingEvent()) return;
        else this._isLoadingEvent.set(true);

        Tools.Sleep().then(() => {
            if(this._htmlElement) {
                this._htmlElement.blur();

                Tools.Sleep().then(() => {
                    const element = document.querySelector(`#${this._id}-container .mdc-line-ripple--active`);
                    if (element) element.classList.remove('mdc-line-ripple--active');
                })
            }

            this._isLoadingEvent.set(false);
        });
    }


    /** */
    public Clear(delay: number = 0): void {
        this.SetValue('');
        this.Focus(false, delay);
    }
}