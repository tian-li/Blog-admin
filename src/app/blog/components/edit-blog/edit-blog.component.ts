import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Rx';
import { switchMap } from 'rxjs/operators';
import { get } from 'lodash';

import * as fromBlog from '../../reducer';
import { Blog } from '../../model/blog';
import * as BlogActions from '../../actions/blog.actions';

@Component({
  selector: 'app-edit-blog',
  templateUrl: './edit-blog.component.html',
  styleUrls: ['./edit-blog.component.scss'],
})
export class EditBlogComponent implements OnInit {
  blog$: Observable<Blog>;
  blog: Blog;
  form: FormGroup;
  blogId: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private store: Store<fromBlog.State>,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        this.blogId = params.get('id');
        if (!!this.blogId) {
          this.store.dispatch(new BlogActions.LoadOneBlog(params.get('id')));
          return this.store.pipe(select(fromBlog.getSelectedBlog));
        } else {
          return Observable.empty();
        }
      })).subscribe((blog: Blog) => {
        this.blog = blog;
        this.form = this.buildForm();
      })
  }

  buildForm(): FormGroup {
    return this.fb.group({
      title: [get(this.blog, 'title'), Validators.required],
      content: [get(this.blog, 'content'), Validators.required],
    });
  }
}
