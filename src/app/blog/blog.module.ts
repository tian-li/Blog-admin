import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ReactiveFormsModule } from '@angular/forms';

import { BlogComponent } from './blog.component';
import { BlogRoutingModule } from './blog-routing.module';
import { MarkdownPipe } from './markdown.pipe';
import { FormsModule } from '@angular/forms';

import { BlogService } from './service/blog.service';
import { reducers } from './reducer';
import { BlogEffects } from './effects/blog.effects';
import { FirebaseService } from '../shared/firebase.service';
import { EditBlogComponent } from './components/edit-blog/edit-blog.component';
import { MaterialModule } from '../shared/material.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    BlogRoutingModule,
    MaterialModule,
    StoreModule.forFeature('blogs', reducers),
    EffectsModule.forFeature([BlogEffects]),
  ],
  declarations: [
    BlogComponent,
    MarkdownPipe,
    EditBlogComponent,
  ],
  providers: [BlogService, FirebaseService],
})
export class BlogModule { }
