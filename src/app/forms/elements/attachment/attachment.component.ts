import { Attachment } from './attachment';
import { Component, Input, OnInit, EventEmitter } from '@angular/core';
import { ElementComponentBase } from '../element-component';
import { FileUploader } from 'ng2-file-upload';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-attachment',
  templateUrl: './attachment.component.html',
  styleUrls: ['./attachment.component.scss'],
})
export class AttachmentComponent implements OnInit, ElementComponentBase<Attachment> {
  @Input() formGroup: FormGroup;

  element: Attachment;

  public fileTitles: Array<string> = [];
  public show: boolean = false;
  public uploader: FileUploader = new FileUploader({
    allowedFileType: ['image', 'pdf', 'zip'],
    autoUpload: false,
    disableMultipart: false,
    itemAlias: 'attachment',
    maxFileSize: 10 * 1024 * 1024  // 10MB
  });

  constructor() { }

  ngOnInit() { }

  public getFiles(): File[] {

    return this.uploader.queue.map((fileItem, index) => {
      if (this.fileTitles[index] == undefined) {
        this.fileTitles.push(fileItem.file.name);
      }
      this.show = true;
      return fileItem._file;
    });
  }

  public getBase64Files() {
    let fileCount: number = this.uploader.queue.length;
    let base_64: Array<any> = [];

    if (fileCount > 0) {

      this.uploader.queue.forEach((val, i, array) => {
        let fileReader = new FileReader();
        fileReader.onloadend = (e) => {
          let imageData: any = fileReader.result;
          let rawData = imageData.split("base64,");

          let fileObject = {
            base64Data: null,
            fileName: null,
            fileSize: null,
            fileTitle: null,
            fileType: null
          };

          if (rawData.length > 1) {
            rawData = rawData[1];
            fileObject.base64Data = rawData;
            fileObject.fileName = val.file.name;
            fileObject.fileSize = val.file.size;
            fileObject.fileTitle = this.fileTitles[i];
            fileObject.fileType = val.file.type;
          }
          console.log(fileObject);
          base_64.push(fileObject);
        }
        fileReader.readAsDataURL(val._file);
      });
    }
    return base_64;
  }

  public getKey(): String {
    return this.element.attachmentBind;
  }

  public onFileSelected(event: EventEmitter<File[]>) {
    this.fileFormData();
  }

  showHideTextBoxTitle(index) {
    this.show = index;
  }

  removeFileFromQueue(index: number) {
    this.fileTitles.splice(index, 1);
    this.uploader.removeFromQueue(this.uploader.queue[index]);
    this.fileFormData();
  }

  fileFormData() {
    this.formGroup.patchValue({
      'attachment': { 'fileList': this.getFiles(), 'fileTitles': this.fileTitles, 'formDataKey': this.getKey(), "base64_files": this.getBase64Files() },
    });
  }
}
