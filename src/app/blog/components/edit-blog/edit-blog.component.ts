import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { of as observableOf } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { takeUntil, skip } from 'rxjs/operators';
import { find, get, pull, isEmpty, every } from 'lodash';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { Blog } from '../../model/blog';
import * as fromBlog from '../../reducer';
import * as BlogActions from '../../actions/blog.actions';
import { ConfirmationDialogComponent } from '../../../shared/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-edit-blog',
  templateUrl: './edit-blog.component.html',
  styleUrls: ['./edit-blog.component.scss'],
})
export class EditBlogComponent implements OnInit, OnDestroy {
  destroy$: Subject<void> = new Subject<void>();
  @ViewChild('tagInput')
  tagInputRef: ElementRef;

  blog: Blog;
  form: FormGroup;
  blogId: string;
  editMode: boolean;
  showPreview = true;
  tags: string[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromBlog.State>,
    public dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.handleError();
    this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) => {
          this.blogId = params.get('id');
          if (!!this.blogId) {
            this.editMode = true;
            this.store.dispatch(new BlogActions.LoadOneBlog(params.get('id')));
            return this.store.pipe(select(fromBlog.getSelectedBlog));
          } else {
            return observableOf(undefined);
          }
        }),
        takeUntil(this.destroy$)
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
    if (every(formValue, isEmpty)) {
      return;
    }
    const blog = {
      isDraft,
      title: formValue.title,
      content: formValue.content,
      lastModified: new Date().valueOf(),
      tags: this.tags,
    };
    if (this.editMode) {
      this.store.dispatch(new BlogActions.EditBlog({ id: this.blogId, blog }));
    } else {
      this.store.dispatch(new BlogActions.AddBlog({ ...blog, createdDate: new Date().valueOf() }));
    }
  }

  back(): void {
    this.router.navigate(['/blog']);
  }

  togglePreview(): void {
    this.showPreview = !this.showPreview;
  }

  delete(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: {
        title: '警告',
        message: '确认删除这篇文章吗？',
        confirm: {
          text: '删除',
          color: 'warn',
        },
        cancel: {
          text: '取消',
          color: 'primary',
        },
      },
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (!!this.blogId && confirmed) {
        this.store.dispatch(new BlogActions.DeleteBlog({ blog: this.blog }));
      }
    });
  }

  handleError(): void {
    this.store
    .pipe(
      select(fromBlog.getErrorMessage),
      skip(1),
      takeUntil(this.destroy$)
    )
    .subscribe((errorMessage) => {
      if (errorMessage === 'Success') {
        this.router.navigate(['/blog']);
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
