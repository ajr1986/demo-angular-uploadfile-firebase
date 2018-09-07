import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styles: []
})
export class PhotosComponent implements OnInit {

  private photosCollection: AngularFirestoreCollection<any>;
  photos: Observable<any[]>;

  constructor(private afs: AngularFirestore) { 

    this.photosCollection = afs.collection<any>('images');
    this.photos = this.photosCollection.valueChanges();
  }

  ngOnInit() {
  }

}
