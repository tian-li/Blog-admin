import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { MatSnackBar } from '@angular/material';

import { select, Store } from '@ngrx/store';
import * as fromBlog from './reducer';
@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['blog.component.scss'],
})
export class BlogComponent {
  id: string;

  constructor(
    public snackBar: MatSnackBar,
    private router: ActivatedRoute,
    private store: Store<fromBlog.State>) { }

  ngOnInit() {
    this.router.paramMap.subscribe((params: Params) => {
      this.id = params.get('id');
    });
    this.store.pipe(select(fromBlog.getErrorMessage)).subscribe((errorMessage: string) => {
      if (!!errorMessage && errorMessage !== 'Success') {
        this.snackBar.open(errorMessage, 'OK');
      }
    });
  }
}
