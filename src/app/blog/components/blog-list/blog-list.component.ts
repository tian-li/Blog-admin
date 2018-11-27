import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Rx';
import { filter } from 'rxjs/operators/filter';

import { Blog } from '../../model/blog';
import * as fromBlog from '../../reducer';
import * as BlogActions from '../../actions/blog.actions';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['blog-list.component.scss'],
})
export class BlogListComponent implements OnInit {
  blogs$: Observable<Blog[]>;
  blogCount: number;
  blogsPerPage = 5;
  currentPage: number;
  blogs: Blog[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromBlog.State>,
  ) {
    this.blogs$ = this.store.pipe(select(fromBlog.getAllBlogs));
    this.store.pipe(select(fromBlog.getAllBlogCount)).subscribe((blogCount: number) => this.blogCount = blogCount);
    this.store.pipe(select(fromBlog.getAllBlogs)).subscribe((blogs) => {
      this.blogs = blogs;
    })
  }

  ngOnInit(): void {
    this.store.dispatch(new BlogActions.LoadAllBlogs());
  }
}
