import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsContainerComponent } from './forms-container.component';
import { MainFormComponent } from './main-form/main-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormInputComponent } from './main-form/form-input/form-input.component';
import { RouterModule } from '@angular/router';
import { OutputComponent } from './output/output.component';

@NgModule({
  declarations: [
    FormsContainerComponent,
    MainFormComponent,
    FormInputComponent,
    OutputComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {path: 'form', component: MainFormComponent},
      {path: 'output', component: OutputComponent}
    ])
  ],
  exports: [
    FormsContainerComponent
  ]
})
export class FormsModule { }
