import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { Blog } from '../blog/model/blog';
import * as fromBlog from '../blog/reducer';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
})
export class SideNavComponent {
  blogs$: Observable<Blog[]>;
  searchWord: string;

  constructor(private store: Store<fromBlog.State>) {
    this.blogs$ = this.store.pipe(select(fromBlog.getAllBlogs));
  }
}
