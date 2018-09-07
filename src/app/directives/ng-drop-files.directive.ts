import { Directive, EventEmitter, ElementRef, HostListener, Input, Output } from '@angular/core';
import { FileItem } from '../models/file-item';

@Directive({
  selector: '[appNgDropFiles]'
})
export class NgDropFilesDirective {

  @Input()
  files: FileItem[] = [];

  @Output()
  mouseOver: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  @HostListener("dragover", ["$event"])
  public onDragEnter(event: any) {
    this.preventOpenImage(event);
    this.mouseOver.emit(true);
  }

  @HostListener("dragleave", ["$event"])
  public onDragLeave(event: any) {
    this.preventOpenImage(event);
    this.mouseOver.emit(false);
  }

  @HostListener("drop", ["$event"])
  public onDrop(event: any) {

    const transfer = this.getTransfer(event);

    if (!transfer) {
      return;
    }

    this.extractFiles(transfer.files);
    this.preventOpenImage(event);
    this.mouseOver.emit(false);
  }

  private getTransfer(event: any) {

    return event.dataTransfer ? event.dataTransfer : event.originalEvent.dataTransfer;
  }

  private extractFiles(fileList: FileList) {

    for (const property in Object.getOwnPropertyNames(fileList)) {

      const tempFile = fileList[property];

      if (this.fileAllowed(tempFile)) {

        const newFile = new FileItem(tempFile);
        this.files.push(newFile);
      }
    }

    console.log(this.files);
  }

  // Validations
  private fileAllowed(file: File): boolean {

    if (!this.existFile(file.name) && this.isImage(file.type)) {

      return true;
    }

    return false;
  }


  private preventOpenImage(event) {
    event.preventDefault();
    event.stopPropagation();
  }

  private existFile(name: string): boolean {
    for (const file of this.files) {
      if (file.name == name) {
        console.log("File " + name + " already added");
        return true;
      }
    }
    return false;
  }

  private isImage(type: string): boolean {

    return (type == "" || type == undefined) ? false : type.startsWith("image");
  }
}
