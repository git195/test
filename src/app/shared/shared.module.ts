import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';
import { MatTreeModule } from '@angular/material/tree';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [],
  exports: [
    MatExpansionModule,
    MatIconModule,
    MatRippleModule,
    MatTreeModule
  ],
  imports: [
    MatExpansionModule,
    MatIconModule,
    MatRippleModule,
    MatTreeModule
  ]
})
export class SharedModule { }