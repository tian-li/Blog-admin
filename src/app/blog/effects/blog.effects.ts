import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { map as _map } from 'lodash';

import { Blog } from '../model/blog';
import {
  BlogActionTypes,
  LoadOneBlog,
  LoadOneBlogSuccess,
  LoadOneBlogFail,
  LoadAllBlogs,
  LoadAllBlogsSuccess,
  LoadAllBlogsFail,
  AddBlog,
  AddBlogSuccess,
  AddBlogFail,
  EditBlog,
  EditBlogSuccess,
  EditBlogFail,
  DeleteBlog,
  DeleteBlogSuccess,
  DeleteBlogFail,
} from '../actions/blog.actions';
import { BlogService } from '../service/blog.service';

@Injectable()
export class BlogEffects {
  @Effect()
  loadAllBlogs$: Observable<Action> = this.actions$.pipe(
    ofType<LoadAllBlogs>(BlogActionTypes.LOAD_ALL_BLOGS),
    switchMap(() => {
      return this.blogService.loadAllBlogs()
        .pipe(
          map((blogs: Blog[]) => new LoadAllBlogsSuccess(blogs)),
          catchError((err: any) => of(new LoadAllBlogsFail(err))),
        );
    }),
  );

  @Effect()
  loadOneBlog$: Observable<Action> = this.actions$.pipe(
    ofType<LoadOneBlog>(BlogActionTypes.LOAD_ONE_BLOG),
    map((action: LoadOneBlog) => action.payload),
    switchMap((blogId: string) => {
      return this.blogService.loadOneBlog(blogId)
        .pipe(
          map((blog: Blog) => new LoadOneBlogSuccess(blog)),
          catchError((err: any) => of(new LoadOneBlogFail(err))),
        );
    }),
  );

  @Effect()
  addBlog$: Observable<Action> = this.actions$.pipe(
    ofType<AddBlog>(BlogActionTypes.ADD_BLOG),
    map((action: AddBlog) => action.payload),
    switchMap((blog: any) => {
      return this.blogService.addBlog(blog)
      .pipe(
        map((data) => {
          return new AddBlogSuccess(data);
        }),
        catchError((err: any) => of(new AddBlogFail(err))),
      );
    })
  );

  @Effect()
  editBlog$: Observable<Action> = this.actions$.pipe(
    ofType<EditBlog>(BlogActionTypes.EDIT_BLOG),
    map((action: EditBlog) => action.payload),
    switchMap((payload: {id: string, blog: any}) => {
      return this.blogService.editBlog(payload.id, payload.blog)
      .pipe(
        map((blog: Blog) => {
          return new EditBlogSuccess(blog.id, blog);
        }),
        catchError((err: any) => of(new EditBlogFail(err))),
      );
    })
  );

  @Effect()
  deleteBlog$: Observable<Action> = this.actions$.pipe(
    ofType<DeleteBlog>(BlogActionTypes.DELETE_BLOG),
    map((action: DeleteBlog) => action.payload),
    switchMap((payload: {blog: Blog}) => {
      return this.blogService.deleteBlog(payload.blog)
      .pipe(
        map((blog: Blog) => {
          return new DeleteBlogSuccess(blog.id, blog);
        }),
        catchError((err: any) => of(new DeleteBlogFail(err))),
      );
    })
  );

  constructor(
    private actions$: Actions,
    private blogService: BlogService,
  ) { }
}
