import { AttachmentType } from '../interfaces/attachment-type';
import { colours } from '../constants/colour';
import { FormService } from '../services/form.service';
import { Injectable } from '@angular/core';
import { messages } from '../constants/messages';
import { NavController } from '@ionic/angular';
import { routes } from '../constants/routes';
import { ToastService } from '../services/toast.service';

@Injectable({
    providedIn: 'root'
})
export class AttachmentService {
    constructor(
        private formService: FormService,
        private nav: NavController,
        private toastService: ToastService
    ) { }


    public uploadStoredFiles(response: any, formAnswer: any) {

        let formAnswerId: any = response.formAnswer.id;

        if (formAnswer.answerData && formAnswer.answerData['attachment']) {

            let attachment: any = formAnswer.answerData['attachment'];

            if (attachment.base64_files) {

                this.convertBase64ToFileObject(attachment.base64_files).then(async (res) => {

                    let fd = new FormData();
                    if (res.length > 0) {

                        fd = await this.prepareFileData(res, attachment, formAnswerId);
                        this.formService.uploadAttachments(fd).subscribe(
                            async (res: any) => {
                                this.nav.navigateBack(routes.modules);
                                await this.toastService.presentToast(colours.success, messages.form.form1SaveSuccessful, true, 'bottom');
                            },
                            async (error: any) => {
                                await this.toastService.presentToast(colours.danger, error);
                            }
                        );
                    }
                }).catch((err) => {
                    console.log("FileObject Covert Error", err);
                })
            }  // end if attachment.base64_files
        } // end if formAnswer.answerData
    }


    public async uploadFiles(response: any, formAnswer: any) {

        if (formAnswer.answerData && formAnswer.answerData['attachment']) {

            let attachmentData = formAnswer.answerData['attachment'];
            let fd = new FormData();
            let formAnswerId: any = response.formAnswer.id;

            fd = await this.prepareFileData(attachmentData.fileList, attachmentData, formAnswerId);

            this.formService.uploadAttachments(fd).subscribe(
                async (res: any) => {
                    this.nav.navigateBack(routes.modules);
                    await this.toastService.presentToast(colours.success, messages.form.form1SaveSuccessful, true, 'bottom');
                },
                async (error: any) => {
                    await this.toastService.presentToast(colours.danger, error);
                }
            );
        }
    }

    public dataURLtoFile(dataurl, filename) {
        var arr = dataurl.split(',');
        var bstr = atob(arr[1]),
            n = bstr.length,
            u8arr = new Uint8Array(n),
            mime = arr[0].match(/:(.*?);/)[1];

        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }

        return new File([u8arr], filename, { type: mime });
    }

    public async convertBase64ToFileObject(base64FilesArray = []) {
        let fileObjectsArray = [];
        await base64FilesArray.forEach((element) => {
            if (element.base64Data) {
                let base64String = 'data:' + element.fileType + ";base64," + element.base64Data;
                var file = this.dataURLtoFile(base64String, element.fileName);
                fileObjectsArray.push(file);
            }
        })
        return fileObjectsArray;
    }

    public generateFormDataKey(attachmentBind) {
        var limit = 1000;
        var newformDataKey = attachmentBind + "_" + Math.round(Math.random() * limit);
        return newformDataKey;
    }

    public prepareFileData(fileList, attachment, formAnswerId) {

        let attachmentData = attachment;
        let attachmentList: Array<string | {}> = [];
        let fd = new FormData();

        for (let i = 0; i < fileList.length; i++) {

            let attachmentTemp: AttachmentType = {
                attachmentBind: "",
                fileName: "",
                fileSize: 0,
                fileType: "",
                formDataKey: "",
                isNewFile: true,
                isPrePopulate: false,
                tempFile: {},
                title: ""
            };

            attachmentTemp.formDataKey = this.generateFormDataKey(attachmentData.formDataKey);
            fd.append(attachmentTemp.formDataKey, fileList[i], fileList[i].name);
            attachmentTemp.attachmentBind = attachmentData.formDataKey;
            attachmentTemp.fileName = fileList[i].name;
            attachmentTemp.fileSize = fileList[i].size;
            attachmentTemp.fileType = fileList[i].type;
            attachmentTemp.isNewFile = true;
            attachmentTemp.isPrePopulate = false;
            attachmentTemp.tempFile = {};
            attachmentTemp.title = attachmentData.fileTitles[i];
            attachmentList.push(attachmentTemp);
        }
        fd.append("attachmentList", JSON.stringify(attachmentList));
        fd.append("formAnswerId", formAnswerId);

        return fd;
    }
}