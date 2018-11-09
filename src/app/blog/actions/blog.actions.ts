import { Action } from '@ngrx/store';

import { Blog } from '../model/blog';

export enum BlogActionTypes {
  LOAD_ALL_BLOGS = '[Blog] Load All Blogs',
  LOAD_ALL_BLOGS_SUCCESS = '[Blog] Load All Blogs Success',
  LOAD_ALL_BLOGS_FAIL = '[Blog] Load All Blogs Fail',

  LOAD_ONE_BLOG = '[Blog] Load One Blog',
  LOAD_ONE_BLOG_SUCCESS = '[Blog] Load One Blog Success',
  LOAD_ONE_BLOG_FAIL = '[Blog] Load One Blog Fail',

  ADD_BLOG = '[Blog] Add Blog',
  ADD_BLOG_SUCCESS = '[Blog] Add Blog Success',
  ADD_BLOG_FAIL = '[Blog] Add Blog Fail',

  EDIT_BLOG = '[Blog] Edit Blog',
  EDIT_BLOG_SUCCESS = '[Blog] Edit Blog Success',
  EDIT_BLOG_FAIL = '[Blog] Edit Blog Fail',
}

export class LoadAllBlogs implements Action {
  readonly type = BlogActionTypes.LOAD_ALL_BLOGS;
}

export class LoadAllBlogsSuccess implements Action {
  readonly type = BlogActionTypes.LOAD_ALL_BLOGS_SUCCESS;

  constructor(public payload: Blog[]) { }
}

export class LoadAllBlogsFail implements Action {
  readonly type = BlogActionTypes.LOAD_ALL_BLOGS_FAIL;

  constructor(public payload: string) { }
}

export class LoadOneBlog implements Action {
  readonly type = BlogActionTypes.LOAD_ONE_BLOG;

  constructor(public payload: string) { }
}

export class LoadOneBlogSuccess implements Action {
  readonly type = BlogActionTypes.LOAD_ONE_BLOG_SUCCESS;

  constructor(public payload: Blog) { }
}

export class LoadOneBlogFail implements Action {
  readonly type = BlogActionTypes.LOAD_ONE_BLOG_FAIL;

  constructor(public payload: string) { }
}

export class AddBlog implements Action {
  readonly type = BlogActionTypes.ADD_BLOG;

  constructor(public payload: any) {}
}

export class AddBlogSuccess implements Action {
  readonly type = BlogActionTypes.ADD_BLOG_SUCCESS;

  constructor(public payload: any) {}
}

export class AddBlogFail implements Action {
  readonly type = BlogActionTypes.ADD_BLOG_FAIL;

  constructor(public payload: string) { }
}

export class EditBlog implements Action {
  readonly type = BlogActionTypes.EDIT_BLOG;

  constructor(public payload: {id: string, blog: any}) { }
}

export class EditBlogSuccess implements Action {
  readonly type = BlogActionTypes.EDIT_BLOG_SUCCESS;

  constructor(public id: string,
    public changes: Partial<Blog>) {}
}

export class EditBlogFail implements Action {
  readonly type = BlogActionTypes.EDIT_BLOG_FAIL;

  constructor(public payload: string) { }
}

export type BlogActionsUnion =
  | LoadAllBlogs
  | LoadAllBlogsSuccess
  | LoadAllBlogsFail
  | LoadOneBlog
  | LoadOneBlogSuccess
  | LoadOneBlogFail
  | AddBlog
  | AddBlogSuccess
  | AddBlogFail
  | EditBlog
  | EditBlogSuccess
  | EditBlogFail;
