import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { MatSidenavModule } from '@angular/material/sidenav';
import { AboutComponent } from './about/about.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BlogModule } from './blog/blog.module';
import { SideNavComponent } from './side-nav/side-nav.component';
import { SideNavModule } from './side-nav/side-nav.module';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    FlexLayoutModule,

    MatSidenavModule,

    StoreModule.forRoot(() => { }),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument(),
    BlogModule,
    SideNavModule,
    AppRoutingModule,
  ],
  declarations: [AppComponent, AboutComponent],
  bootstrap: [AppComponent],
})
export class AppModule { }
