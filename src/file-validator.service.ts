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

    let isValid = false;
    let regexPattern: RegExp;

    for (let pattern of this.options.fileTypePatterns) {
      regexPattern = new RegExp(pattern);

      if (regexPattern.test(file.type)) {
        isValid = true;
      }
    }

    return isValid;
  }
}
