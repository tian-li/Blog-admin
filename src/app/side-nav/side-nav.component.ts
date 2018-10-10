import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Rx';
import { filter } from 'rxjs/operators/filter';

import { Blog } from '../blog/model/blog';
import * as fromBlog from '../blog/reducer';
import * as BlogActions from '../blog/actions/blog.actions';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {

  blogs$: Observable<Blog[]>;
  searchWord: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromBlog.State>,
  ) {
    this.blogs$ = this.store.pipe(select(fromBlog.getAllBlogs));
  }

  ngOnInit() {

  }

}
