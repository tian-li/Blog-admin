import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { select, Store } from '@ngrx/store';
import { filter, orderBy } from 'lodash';
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators';

import { Blog } from '../../model/blog';
import * as fromBlog from '../../reducer';
import * as BlogActions from '../../actions/blog.actions';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['blog-list.component.scss'],
})
export class BlogListComponent implements OnInit, OnDestroy {
  destroy$: Subject<void> = new Subject<void>();
  allBlogs: Blog[];
  filteredBlogs: Blog[];

  constructor(private store: Store<fromBlog.State>) {}

  ngOnInit(): void {
    this.store.dispatch(new BlogActions.LoadAllBlogs());
    this.store
      .pipe(
        select(fromBlog.getAllBlogs),
        takeUntil(this.destroy$)
      )
      .subscribe((blogs: Blog[]) => {
        this.allBlogs = orderBy(blogs, 'lastModified', 'desc');
        this.filteredBlogs = this.allBlogs;
      });
  }

  onCheckBoxChange(event: MatCheckboxChange) {
    this.filteredBlogs = event.checked
      ? filter(this.allBlogs, (blog: Blog) => blog.isDraft)
      : this.allBlogs;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
