import { Component, OnInit } from '@angular/core';
import { FileItem } from '../../models/file-item';
import { LoadImagesService } from '../../services/load-images.service';

@Component({
  selector: 'app-load',
  templateUrl: './load.component.html',
  styles: []
})
export class LoadComponent implements OnInit {

  isOverDrop: boolean = false;
  files: FileItem[] = [];

  constructor(private ls: LoadImagesService) { 
  }

  ngOnInit() {
  }

  uploadImages(){
    this.ls.uploadImages(this.files);
  }

  clearFiles(){
    this.files = [];
  }

}
