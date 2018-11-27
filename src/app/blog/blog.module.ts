import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { BlogComponent } from './blog.component';
import { BlogRoutingModule } from './blog-routing.module';
import { BlogService } from './service/blog.service';
import { reducers } from './reducer';
import { BlogEffects } from './effects/blog.effects';
import { EditBlogComponent } from './components/edit-blog/edit-blog.component';
import { SharedModule } from '../shared/shared.module';
import { BlogListComponent } from './components/blog-list/blog-list.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    BlogRoutingModule,
    StoreModule.forFeature('blogs', reducers),
    EffectsModule.forFeature([BlogEffects]),
  ],
  declarations: [
    BlogComponent,
    EditBlogComponent,
    BlogListComponent,
    SideNavComponent,
  ],
  providers: [BlogService],
  exports: [
    SideNavComponent,
  ],
})
export class BlogModule { }
