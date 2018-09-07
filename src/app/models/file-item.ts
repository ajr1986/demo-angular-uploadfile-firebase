export class FileItem {

    public file: File;
    public name: string;
    public url: string;
    public isLoading: boolean;
    public progess: number;

    constructor(file: File){

        this.file = file;
        this.name = file.name;
        this.isLoading = false;
        this.progess = 0;
    }
}