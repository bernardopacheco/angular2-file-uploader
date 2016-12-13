import { Injectable } from '@angular/core';
import { UploadOptions } from './upload-options';

@Injectable()
export class FileValidatorService {
  private options: UploadOptions;

  setOptions(options: UploadOptions): void {
    this.options = { fileTypePatterns: options.fileTypePatterns };
  }

  isFileTypeValid(file: File): boolean {
    if (!this.options.fileTypePatterns) {
      return true;
    }

    return this.options.fileTypePatterns.test(file.name);
  }
}
