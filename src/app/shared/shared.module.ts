import { ModuleWithProviders, NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from './material.module';
import { FirebaseService } from './firebase.service';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { TruncateStringPipe } from './pipes/truncate-string.pipe';
import { MarkdownPipe } from './pipes/markdown.pipe';

const components = [ConfirmationDialogComponent];

const pipes = [MarkdownPipe, TruncateStringPipe];

@NgModule({
  imports: [MaterialModule, FlexLayoutModule],
  declarations: [...components, ...pipes],
  exports: [MaterialModule, FlexLayoutModule, ...pipes],
  entryComponents: [ConfirmationDialogComponent],
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [FirebaseService],
    };
  }
}
