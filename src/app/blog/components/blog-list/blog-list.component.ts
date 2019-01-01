import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { select, Store } from '@ngrx/store';
import { filter, forEach, get } from 'lodash';
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
  filters: { [filterName: string]: { key: string; value: any } } = {
    showDraft: {
      key: 'isDraft',
      value: false,
    },
    showDeleted: {
      key: 'deleted',
      value: false,
    },
  };

  constructor(private store: Store<fromBlog.State>) {}

  ngOnInit(): void {
    this.store.dispatch(new BlogActions.LoadAllBlogs());
    this.store
      .pipe(
        select(fromBlog.getAllBlogs),
        takeUntil(this.destroy$)
      )
      .subscribe((blogs: Blog[]) => {
        this.allBlogs = blogs;
        this.filterBlogs();
      });
  }

  toggleDraft(event: MatCheckboxChange): void {
    this.filters.showDraft.value = event.checked;
    this.filterBlogs();
  }

  toggleTrash(event: MatCheckboxChange): void {
    this.filters.showDeleted.value = event.checked;
    this.filterBlogs();
  }

  filterBlogs(): void {
    let filterApplied: Blog[] = [...this.allBlogs];
    forEach(this.filters, (predicate: { key: string; value: any }) => {
      filterApplied = filter(
        filterApplied,
        (blog: Blog) => get(blog, predicate.key) === predicate.value
      );
    });
    this.filteredBlogs = filterApplied;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
