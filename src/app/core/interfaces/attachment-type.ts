export interface AttachmentType {
    attachmentBind:string;
    fileName:string;
    fileSize:number;
    fileType:string;
    formDataKey:string;
    isNewFile:boolean;
    isPrePopulate?: boolean;
    tempFile?:any;
    title?:string;
}
