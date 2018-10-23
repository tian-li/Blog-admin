import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs/Rx';
import { switchMap } from 'rxjs/operators';
import { get } from 'lodash';

import { Blog } from '../../model/blog';
import * as fromBlog from '../../reducer';
import * as BlogActions from '../../actions/blog.actions';

@Component({
  selector: 'app-edit-blog',
  templateUrl: './edit-blog.component.html',
  styleUrls: ['./edit-blog.component.scss'],
})
export class EditBlogComponent implements OnInit {
  blog: Blog;
  form: FormGroup;
  blogId: string;
  editMode: boolean;
  showPreview: boolean = true;
  initBlogSubscription: Subscription;
  errorMessageSubscription: Subscription;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromBlog.State>,
  ) { }

  ngOnInit(): void {
    this.initBlogSubscription = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        this.blogId = params.get('id');
        if (!!this.blogId) {
          this.editMode = true;
          this.store.dispatch(new BlogActions.LoadOneBlog(params.get('id')));
          return this.store.pipe(select(fromBlog.getSelectedBlog));
        } else {
          return Observable.of(undefined);
        }
      })).subscribe((blog: Blog) => {
        this.blog = blog;
        this.form = this.buildForm();
      });
  }

  

  buildForm(): FormGroup {
    return this.fb.group({
      title: [get(this.blog, 'title'), Validators.required],
      content: [get(this.blog, 'content'), Validators.required],
    });
  }

  save(): void {
    const formValue = this.form.getRawValue();
    let blog = {
      title: formValue.title,
      content: formValue.content,
      lastModified: new Date().valueOf(),
    };
    if (this.editMode) {
      this.store.dispatch(new BlogActions.EditBlog({ id: this.blogId, blog }))
    } else {
      this.store.dispatch(new BlogActions.AddBlog({ ...blog, createdDate: new Date().valueOf() }));
    }
    this.errorMessageSubscription = this.store.pipe(select(fromBlog.getErrorMessage)).subscribe((errorMessage) => {
      if (errorMessage === 'Success') {
        this.router.navigate(['/blog']);
      }
    });
  }

  back() {
    this.router.navigate(['/blog']);
  }

  togglePreview(): void {
    this.showPreview = !this.showPreview;
  }

  ngOnDestroy() {
    if (this.initBlogSubscription) {
      this.initBlogSubscription.unsubscribe();
    }
    if (this.errorMessageSubscription) {
      this.errorMessageSubscription.unsubscribe();
    }
  }
}
