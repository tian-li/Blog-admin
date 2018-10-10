import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserModule } from '@angular/platform-browser';

import { BlogService } from '../blog/service/blog.service';
import { BlogModule } from '../blog/blog.module';
import { SideNavComponent } from './side-nav.component';
import { BlogListComponent } from "./blog-list/blog-list.component";
import { BlogListItemComponent } from "./blog-list/blog-list-item/blog-list-item.component";
import { TruncateStringPipe } from './blog-list/truncate-string.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    FlexLayoutModule,
    MatListModule,
    BlogModule,
  ],
  declarations: [
    BlogListComponent,
    BlogListItemComponent,
    SideNavComponent,
    TruncateStringPipe
  ],
  providers: [BlogService],
  exports: [SideNavComponent]
})
export class SideNavModule { }