import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayComponent } from './overlay/overlay.component';
import { OverlayService } from './service/overlay.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    OverlayComponent
  ],
  providers: [
    OverlayService
  ],
  entryComponents: [
    OverlayComponent
  ]
})
export class OverlayModule { }