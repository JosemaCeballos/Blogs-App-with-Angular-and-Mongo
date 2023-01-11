import { Global } from "./global";
class AfuCon {
    constructor(
        public multiple: boolean,
        public formatsAllowed: string,
        public maxSize: string,
        public uploadApi: any,
        public theme: string,
        public hideProgressBar: boolean,
        public hideSelectBtn: boolean,
        public replaceTexts: any
    ) { }
}


export var AfuConf: AfuCon = {
    multiple: false,
    formatsAllowed: ".jpg,.png, .gif, .jpeg",
    maxSize: "50",
    uploadAPI: {
        url: Global.url+'upload-image',
    },
    theme: "attachPin",
    hideProgressBar: true,
    hideResetBtn: true,
    hideSelectBtn: true,
    replaceTexts: {
        selectFileBtn: 'Select Files',
        resetBtn: 'Reset',
        uploadBtn: 'Upload',
        dragNDropBox: 'Drag N Drop',
        attachPinBtn: 'Sube tu imagen para el articulo',
        afterUploadMsg_success: 'Successfully Uploaded !',
        afterUploadMsg_error: 'Upload Failed !',
        sizeLimit: 'Size Limit'
    }
};