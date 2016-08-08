import { Directive, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { FileUploaderService } from './file-uploader.service';
import { FileValidatorService } from './file-validator.service';
import { UploadOptions } from './upload-options';

@Directive({
  selector: '[bpFileSelect]',
  host: { '(change)': 'onFiles()' },
  providers: [FileUploaderService, FileValidatorService]
})
export class FileSelectDirective {
  @Input() set uploadOptions(options: UploadOptions) {
    this.fileUploaderService.setOptions(options);
    this.fileValidatorService.setOptions(options);
  }

  @Output() onSuccess = new EventEmitter<any>();
  @Output() onUploadError = new EventEmitter<string>();
  @Output() onFileTypeError = new EventEmitter<File>();
  @Output() onProgress = new EventEmitter<number>();

  constructor(
      private el: ElementRef,
      private fileUploaderService: FileUploaderService,
      private fileValidatorService: FileValidatorService) {
    this.fileUploaderService.onSuccess$.subscribe((response: any) => this.onSuccess.emit(response));
    this.fileUploaderService.onError$.subscribe((error: string) => this.onUploadError.emit(error));
    this.fileUploaderService.onProgress$.subscribe((percentComplete: number) => this.onProgress.emit(percentComplete));
  }

  onFiles(): void {
    let files: FileList = this.el.nativeElement.files;

    for (let i = 0; i < files.length; i++) {
      if (this.fileValidatorService.isFileTypeValid(files[i])) {
        this.fileUploaderService.addFileToQueue(files[i]);
      } else {
        this.onFileTypeError.emit(files[i]);
      }
    }
  }
}
