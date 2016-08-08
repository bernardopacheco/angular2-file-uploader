import { Injectable } from '@angular/core';
import { UploadOptions } from './upload-options';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class FileUploaderService {
  private options: UploadOptions;
  private onSuccessSource: Subject<any> = new Subject<any>();
  private onErrorSource: Subject<string> = new Subject<string>();
  private onProgressSource: Subject<number> = new Subject<number>();

  onSuccess$: Observable<any> = this.onSuccessSource.asObservable();
  onError$: Observable<string> = this.onErrorSource.asObservable();
  onProgress$: Observable<number> = this.onProgressSource.asObservable();

  setOptions(options: UploadOptions): void {
    if (!options) {
      throw new TypeError('UploadOptions must be specified.');
    }

    if (!options.url) {
      throw new TypeError('UploadOptions.url field must be specified.');
    }

    this.options = { url: options.url };
    this.options.method = !options.method ? 'post' : options.method.toLowerCase();
    this.options.autoUpload = !options.autoUpload ? false : options.autoUpload;
    this.options.authTokenPrefix = !options.authTokenPrefix ? 'Bearer' : options.authTokenPrefix;
    this.options.authToken = options.authToken;
    this.options.fileTypePatterns = options.fileTypePatterns;
  }

  addFileToQueue(file: File): void {
    if (this.options.autoUpload) {
      this.upload(file);
    }

    // todo:
    // - implement file queue
    // - implement autoUpload = false. The directive must export a hook to fire the upload manually
  }

  upload(file: File): void {
    let xhr = new XMLHttpRequest();
    let form = new FormData();

    form.append('file', file, file.name);

    xhr.onreadystatechange = () => {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          this.onSuccessSource.next(xhr.response);
        } else {
          this.onErrorSource.next(xhr.response);
        }
      }
    };

    xhr.upload.onprogress = (event: ProgressEvent) => {
      if (event.lengthComputable) {
        let percentComplete = Math.round(event.loaded / event.total * 100);
        this.onProgressSource.next(percentComplete);
      }
    };

    xhr.open(this.options.method, this.options.url, true);

    if (this.options.authToken) {
      xhr.setRequestHeader('Authorization', `${this.options.authTokenPrefix} ${this.options.authToken}`);
    }

    xhr.send(form);
  }
}
