import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { SplitPipe } from './pipes/split-string';

@NgModule({
  declarations: [
    SafeHtmlPipe,
    SplitPipe
  ],
  exports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    SafeHtmlPipe,
    SplitPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule
  ]
})
export class CoreModule { }
