import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import * as firebase from "firebase";
import { FileItem } from '../models/file-item';
import { AngularFireStorage } from 'angularfire2/storage';

@Injectable({
  providedIn: 'root'
})
export class LoadImagesService {

  private imageFolder = "img";

  constructor(private fs: AngularFirestore, private afs: AngularFireStorage) { }

  uploadImages(images: FileItem[]) {

    console.log(images);
    let storageRef = firebase.storage().ref();

    for (const img of images) {

      img.isLoading = true;
      if (img.progess >= 100) {
        continue;
      }

      let uploadTask: firebase.storage.UploadTask = storageRef.child(`${this.imageFolder}/${img.name}`)
        .put(img.file);

      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot: firebase.storage.UploadTaskSnapshot) => {
          img.progess = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (error) => console.log("Error uploading file " + img.name),
        () => {

          console.log("Image upload successfully");
          img.isLoading = false;

          storageRef.child(`${this.imageFolder}/${img.name}`).getDownloadURL()
            .then(
              url => {

                let image = {
                  name: img.name,
                  url: url
                }

                this.saveImageRefenceInDB(image);

              });
        });

    }
  }

  private saveImageRefenceInDB(image: { name: string, url: string }) {
    this.fs.collection("images").add(image);
  }
}
