import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { from, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { map as _map} from 'lodash';

import { Blog } from '../model/blog';
import { FirebaseService } from '../../shared/firebase.service';

@Injectable()
export class BlogService {
  blogsCollection;
  orderedBlogsCollection;

  constructor(private firebaseService: FirebaseService) {
    this.blogsCollection = firebaseService.blogsCollectionRef;
    this.orderedBlogsCollection = firebaseService.blogsCollectionRef.orderBy(
      'lastModified',
      'desc'
    );
  }

  loadAllBlogsInfo(): Observable<any> {
    return from(this.orderedBlogsCollection.get()).pipe(
      map((querySnapshot: any) => {
        return {
          allBlogCount: querySnapshot.size,
          allBlogCreateTimes: _map(
            querySnapshot.docs,
            (doc: any) => doc.data().createdDate
          ),
        };
      })
    );
  }

  loadOneBlog(blogId: string): Observable<Blog> {
    return from(this.blogsCollection.doc(blogId).get()).pipe(
      map(
        (documentSnapshot: any) =>
          new Blog({ id: documentSnapshot.id, ...documentSnapshot.data() })
      )
    );
  }

  loadAtPage(startAtId: string, numberPerPage: number): Observable<Blog[]> {
    return this.createObservable(
      this.orderedBlogsCollection
        .startAt(startAtId)
        .limit(numberPerPage)
        .get()
    );
  }

  loadAllBlogs(): Observable<Blog[]> {
    return this.createObservable(this.orderedBlogsCollection.get());
  }

  addBlog(blog: any): Observable<Blog> {
    return from(this.blogsCollection.add(blog)).pipe(
      switchMap((documentReference: any) => {
        return from(documentReference.get()).pipe(
          map(
            (documentSnapshot: any) =>
              new Blog({ id: documentSnapshot.id, ...documentSnapshot.data() })
          )
        );
      })
    );
  }

  editBlog(id: string, blog: any): Observable<Blog> {
    console.log('blog to edit', blog);
    return from(this.blogsCollection.doc(id).update(blog)).pipe(
      switchMap(() => {
        return of(new Blog({ id, ...blog }));
      })
    );
  }

  deleteBlog(blog: Blog): Observable<Blog> {
    console.log('blog to delete', blog);
    return from(this.blogsCollection.doc(blog.id).update({deleted: true})).pipe(
      switchMap(() => {
        return of(new Blog({ ...blog, deleted: true }));
      })
    );
  }

  createObservable(promise: any): Observable<Blog[]> {
    return from(promise).pipe(
      map((querySnapshot: any) =>
        _map(
          querySnapshot.docs,
          doc => new Blog({ id: doc.id, ...doc.data() })
        )
      )
    );
  }
}
