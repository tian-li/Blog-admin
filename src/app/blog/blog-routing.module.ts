import { NgModule } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

import { BlogComponent } from './blog.component';
import { BlogDetailComponent } from './components/blog-detail/blog-detail.component';
import { EditBlogComponent } from './components/edit-blog/edit-blog.component';

const blogRoutes = [
  {
    path: 'blog',
    component: BlogComponent,
  },
  { path: 'blog/:id/edit', component: EditBlogComponent },
  { path: 'blog/:id', redirectTo: 'blog/:id/edit', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forChild(blogRoutes)],
  exports: [RouterModule],
})
export class BlogRoutingModule { }
