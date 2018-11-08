import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs/Rx';
import { switchMap } from 'rxjs/operators';
import { find, get, pull } from 'lodash';

import { Blog } from '../../model/blog';
import * as fromBlog from '../../reducer';
import * as BlogActions from '../../actions/blog.actions';

@Component({
  selector: 'app-edit-blog',
  templateUrl: './edit-blog.component.html',
  styleUrls: ['./edit-blog.component.scss'],
})
export class EditBlogComponent implements OnInit {
  @ViewChild('tagInput')
  tagInputRef: ElementRef;

  blog: Blog;
  form: FormGroup;
  blogId: string;
  editMode: boolean;
  showPreview: boolean = true;
  initBlogSubscription: Subscription;
  errorMessageSubscription: Subscription;
  tags: string[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromBlog.State>
  ) {}

  ngOnInit(): void {
    this.initBlogSubscription = this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) => {
          this.blogId = params.get('id');
          if (!!this.blogId) {
            this.editMode = true;
            this.store.dispatch(new BlogActions.LoadOneBlog(params.get('id')));
            return this.store.pipe(select(fromBlog.getSelectedBlog));
          } else {
            return Observable.of(undefined);
          }
        })
      )
      .subscribe((blog: Blog) => {
        this.blog = blog;
        this.tags = get(blog, 'tags') ? get(blog, 'tags') : [];
        this.form = this.buildForm();
      });
  }

  focusTagInput(): void {
    this.tagInputRef.nativeElement.focus();
  }

  onKeyUp(event: KeyboardEvent): void {
    const inputValue: string = this.form.controls.tag.value;
    if (event.code === 'Backspace' && !inputValue) {
      this.removeTag();
      return;
    } else {
      if (event.code === 'Comma' || event.code === 'Space') {
        this.addTag(inputValue);
        this.form.controls.tag.setValue('');
      }
    }
  }

  addTag(tag: string): void {
    if (tag[tag.length - 1] === ',' || tag[tag.length - 1] === ' ') {
      tag = tag.slice(0, -1);
    }
    if (tag.length > 0 && !find(this.tags, tag)) {
      this.tags.push(tag);
    }
  }

  removeTag(tag?: string): void {
    if (!!tag) {
      pull(this.tags, tag);
    } else {
      this.tags.splice(-1);
    }
  }

  buildForm(): FormGroup {
    return this.fb.group({
      title: [get(this.blog, 'title'), Validators.required],
      tag: [undefined],
      content: [get(this.blog, 'content'), Validators.required],
    });
  }

  save(isDraft: boolean): void {
    const formValue = this.form.getRawValue();
    let blog = {
      isDraft,
      title: formValue.title,
      content: formValue.content,
      lastModified: new Date().valueOf(),
      tags: this.tags,
    };
    if (this.editMode) {
      this.store.dispatch(new BlogActions.EditBlog({ id: this.blogId, blog }));
    } else {
      this.store.dispatch(
        new BlogActions.AddBlog({ ...blog, createdDate: new Date().valueOf() })
      );
    }
    this.errorMessageSubscription = this.store
      .pipe(select(fromBlog.getErrorMessage))
      .subscribe(errorMessage => {
        if (errorMessage === 'Success') {
          this.router.navigate(['/blog']);
        }
      });
  }

  back(): void {
    this.router.navigate(['/blog']);
  }

  togglePreview(): void {
    this.showPreview = !this.showPreview;
  }

  ngOnDestroy(): void {
    if (this.initBlogSubscription) {
      this.initBlogSubscription.unsubscribe();
    }
    if (this.errorMessageSubscription) {
      this.errorMessageSubscription.unsubscribe();
    }
  }
}
