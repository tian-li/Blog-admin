import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable()
export class FirebaseService {
  firestore;
  blogCollectionRef;
  constructor() {
    const config = {
      apiKey: 'AIzaSyCZpIltWNZZcyXAARe74rqKQcbHsZ0FCa4',
      authDomain: 'blog-rewrite.firebaseapp.com',
      databaseURL: 'https://blog-rewrite.firebaseio.com',
      projectId: 'blog-rewrite',
      storageBucket: 'blog-rewrite.appspot.com',
      messagingSenderId: '396106547404',
    };
    firebase.initializeApp(config);
    this.firestore = firebase.firestore();
    this.firestore.settings({ timestampsInSnapshots: true });
  }

  get db() {
    return this.firestore;
  }

  get blogsCollectionRef() {
    return this.firestore.collection('blogs');
  }
}
