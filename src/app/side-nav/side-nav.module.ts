import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';

import { BlogService } from '../blog/service/blog.service';
import { BlogModule } from '../blog/blog.module';
import { SideNavComponent } from './side-nav.component';
import { BlogListComponent } from './blog-list/blog-list.component';
import { TruncateStringPipe } from './blog-list/truncate-string.pipe';
import { MaterialModule } from '../shared/material.module';

@NgModule({
  imports: [CommonModule, FormsModule, RouterModule, FlexLayoutModule, MaterialModule, BlogModule],
  declarations: [BlogListComponent, SideNavComponent, TruncateStringPipe],
  providers: [BlogService],
  exports: [SideNavComponent],
})
export class SideNavModule {}
