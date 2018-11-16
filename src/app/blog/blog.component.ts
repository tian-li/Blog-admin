import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators';

import { select, Store } from '@ngrx/store';
import * as fromBlog from './reducer';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['blog.component.scss'],
})
export class BlogComponent implements OnInit, OnDestroy {
  destroy$: Subject<void> = new Subject<void>();
  id: string;

  constructor(
    public snackBar: MatSnackBar,
    private router: ActivatedRoute,
    private store: Store<fromBlog.State>
  ) {}

  ngOnInit() {
    this.router.paramMap.pipe(takeUntil(this.destroy$)).subscribe((params: Params) => {
      this.id = params.get('id');
    });
    this.store
      .pipe(
        select(fromBlog.getErrorMessage),
        takeUntil(this.destroy$)
      )
      .subscribe((errorMessage: string) => {
        if (!!errorMessage && errorMessage !== 'Success') {
          this.snackBar.open(errorMessage, 'OK');
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
