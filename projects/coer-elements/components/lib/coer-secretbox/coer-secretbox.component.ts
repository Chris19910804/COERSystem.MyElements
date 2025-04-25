import { Component, computed, ElementRef, input, Input, OnInit, output, signal, viewChild } from '@angular/core';
import { CONTROL_VALUE, ControlValue, Tools } from 'coer-elements/tools';

@Component({
    selector: 'coer-secretbox',
    templateUrl: './coer-secretbox.component.html',
    styleUrl: './coer-secretbox.component.scss',
    providers: [CONTROL_VALUE(CoerSecretBox)],
    standalone: false
})
export class CoerSecretBox extends ControlValue implements OnInit {

    //Component Value
    protected override _value: string | number = '';
    protected matFormField = viewChild.required<ElementRef>('matFormField');
    protected coerTextBox = viewChild.required<ElementRef>('coerTextBox');

    //Variables
    protected _id: string = Tools.GetGuid('coer-textBox');
    protected _isLoadingEvent = signal<boolean>(false);
    protected passwordType: boolean = true;
    private element!: HTMLInputElement;

    //Inputs 
    public id            = input<string>('');
    public label         = input<string>('');
    public placeholder   = input<string>('');
    public textPosition  = input<'left' | 'center' | 'right'>('left'); 
    public minLength     = input<number | string>(0);
    public maxLength     = input<number | string>(25);
    public isInvalid     = input<boolean>(false);
    public isValid       = input<boolean>(false);
    public showSecret    = input<boolean>(false); 
    public selectOnFocus = input<boolean>(false);
    public isLoading     = input<boolean>(false);
    public isDisabled    = input<boolean>(false);
    public isReadonly    = input<boolean>(false);
    public isInvisible   = input<boolean>(false); 
    public width         = input<string>('100%');
    public minWidth      = input<string>('190px');
    public maxWidth      = input<string>('100%'); 
    public marginTop     = input<string>('0px');
    public marginRight   = input<string>('0px');
    public marginBottom  = input<string>('0px');
    public marginLeft    = input<string>('0px');

    @Input() set value(value: string | number | null | undefined) {
        if(Tools.IsNull(value)) value = '';
        this.SetValue(value);
    }

    //Outputs
    public onKeyupEnter = output<string | number>();
    public onInput      = output<string | number>();
    public onClickClear = output<void>();
    public onClickExternalButton = output<void>();

    ngOnInit() {
        this._SetEvents();
    }


    //getter
    protected get _showSecret() {
        return !this.showSecret()
            && !this.isDisabled()
            && !this.isLoading()
    }


    //getter
    protected get _passwordType() {
        return this.showSecret() 
            || this.passwordType 
            || this.isDisabled() 
            || this.isLoading()
    }
    
    
    //getter
    public get value(): string {
        return String(this._value);
    }


    //computed
    protected _isEnable = computed<boolean>(() => {
        return !this.isDisabled() && !this.isLoading() && !this.isReadonly() && !this.isInvisible();
    });



    //computed
    protected _floatLabel = computed<'auto' | 'always'>(() => {
        return this.label() == '' ? 'always' : 'auto'
    });


    //computed
    protected _paddingRight = computed(() => {
        if(this._showSecret && (this.isInvalid() || this.isValid())) {
            return '45px';
        }

        else if (this._showSecret || this.isInvalid() || this.isValid()) {
            return '18px';
        }

        else {
            return '0px';
        }
    });


    /** */
    private _SetEvents(): void {
        Tools.Sleep().then(()=> {
            this.element = document.getElementById(this._id)! as HTMLInputElement;

            if (this.element) {
                this.element.addEventListener('focus', () => {
                    if (!this._isEnable()) this.Blur();
                    else if (this.selectOnFocus()) this.Focus(true);
                });

                this.element.addEventListener('keyup', (event: KeyboardEvent) => {
                    if (this._isEnable()) {
                        const { key } = event;

                        if (key === 'Enter') {
                            const value = this.coerTextBox().nativeElement.value;
                            this.onKeyupEnter.emit(value);
                            this.Blur();
                        }
                    }
                });

                this.element.addEventListener('blur', () => this.Blur());

                this.element.addEventListener('input', () => {
                    Tools.Sleep().then(() => {
                        const value = this.coerTextBox().nativeElement.value;
                        if (this._isEnable()) this.onInput.emit(value);
                    });
                });

                this.element.addEventListener('paste', () => {
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
                this.element.focus();
                if(select) this.element.select();
            }

            this._isLoadingEvent.set(false);
        });
    }


    /** */
    public Blur(): void {
        if(this._isLoadingEvent()) return;
        else this._isLoadingEvent.set(true);

        Tools.Sleep().then(() => {
            if(this.element) {
                this.element.blur();

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