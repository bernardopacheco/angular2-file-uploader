import { Directive, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { FileUploaderService } from './file-uploader.service';
import { UploadOptions } from './upload-options';

@Directive({
  selector: '[bpFileSelect]',
  host: { '(change)': 'onFiles()' },
  providers: [FileUploaderService]
})
export class FileSelectDirective {
  private el: ElementRef;
  private fileUploaderService: FileUploaderService;

  @Input() set uploadOptions(options: UploadOptions) {
    this.fileUploaderService.setOptions(options);
  }

  @Output() onSuccess = new EventEmitter<any>();
  @Output() onError = new EventEmitter<ProgressEvent>();
  @Output() onProgress = new EventEmitter<number>();

  constructor(private _el: ElementRef, private _fileUploaderService: FileUploaderService) {
    this.el = _el;
    this.fileUploaderService = _fileUploaderService;
    this.fileUploaderService.onSuccess$.subscribe((response: any) => this.onSuccess.emit(response));
    this.fileUploaderService.onError$.subscribe((error: ProgressEvent) => this.onError.emit(error));
    this.fileUploaderService.onProgress$.subscribe((percentComplete: number) => this.onProgress.emit(percentComplete));
  }

  onFiles(): void {
    let files: FileList = this.el.nativeElement.files;

    if (files.length) {
      this.fileUploaderService.addFilesToQueue(files);
    }
  }
}
