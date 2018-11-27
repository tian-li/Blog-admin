import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  { path: '', redirectTo: 'blog', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      {
        scrollPositionRestoration: 'enabled',
        // enableTracing: true,
      },
    )
  ],
  exports: [
    RouterModule,
  ],
})
export class AppRoutingModule { }
