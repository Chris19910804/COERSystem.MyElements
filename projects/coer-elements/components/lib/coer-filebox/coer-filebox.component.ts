import { Component, computed, ElementRef, inject, Input, input, output, viewChild } from '@angular/core';
import { CoerModal } from '../../lib/coer-modal/coer-modal.component';
import { IFile, IFileImage } from 'coer-elements/interfaces';
import { CoerAlert, Files, Tools } from 'coer-elements/tools';

@Component({
    selector: 'coer-filebox',
    templateUrl: './coer-filebox.component.html',
    styleUrl: './coer-filebox.component.scss',
    standalone: false
})
export class CoerFilebox {

    //Injections
    protected readonly alert = inject(CoerAlert);
    protected IsNull = Tools.IsNull;
    protected IsNotNull = Tools.IsNotNull;
    protected IsNotOnlyWhiteSpace = Tools.IsNotOnlyWhiteSpace;

    //Elements
    protected _inputFileImage = viewChild.required<ElementRef>('inputFileImage');
    protected _modal = viewChild.required<CoerModal>('modal');

    //Variables
    protected _base64: string = '';
    protected _image: IFileImage | null = null;
    private readonly _imageExtensions = ['png', 'jpeg', 'jpg', 'gif', 'svg'];

    //Inputs
    public type = input<'image'>('image');
    public multiple = input<boolean>(false);
    public isLoading = input<boolean>(false);
    public isDisabled = input<boolean>(false);
    public isReadonly = input<boolean>(false);
    public isInvisible = input<boolean>(false);

    @Input() set image(value: IFileImage | null | undefined) {
        if(this.type() === 'image') {
            this._image = Tools.IsNotNull(value) ? value as IFileImage : null;
    
            if(Tools.IsNotNull(value)) {
                if((value?.value as File)?.name) {
                    Files.ConvertToBase64(value?.value as File).then(base64 => {
                        return this._base64 = base64;
                    });
                }
    
                else this._base64 = (value?.value as string);
            }
        }
    }

    
    //Outputs
    public onSelected = output<IFile[]>();
    public onDeleteImage = output<void>();


    //computed
    protected _isEnable = computed<boolean>(() => {
        return !this.isLoading() && !this.isDisabled() && !this.isInvisible();
    });


    /** */
    protected async _UploadImages(event: any): Promise<void> {
        const selectedFiles: File[] = Array.from(event.target.files);

        const files: IFile[] = [];
        let extension: string | null = null;
        for (const file of selectedFiles) {

            extension = this._GetExtensionFile(file.name) || '';

            if (this._imageExtensions.includes(extension)) {
                files.push({
                    file: file,
                    extension: extension,
                    base64: await Files.ConvertToBase64(file) as string
                });
            }

            else this.alert.Warning(`<b>.${extension}</b> extension not allowed`, 'Files');
        }

        //Response
        this._inputFileImage().nativeElement.value = null;
        this.onSelected.emit([...files]);
    }


    /** */
    private _GetExtensionFile = (fileName: string): string | null => {
        if (fileName.includes('.')) {
            let worlds = fileName.split('.') as string[];
            if (worlds.length > 0) {
                let extension = worlds.pop()!;
                extension = extension.trim();
                extension = extension.toLowerCase();
                if (extension.length > 0) return extension;
            }
        }

        this.alert.Warning('The file extension could not be recognized', 'Files');
        return null;
    }


    /** */
    protected _DeleteImage(event: any): void {
        event.stopPropagation();

        if(this._isEnable()) {
            this.onDeleteImage.emit();
        }
    }


    /** */
    protected _ExpandImage(event: any): void {
        event.stopPropagation();
        this._modal().Open();
    }
}