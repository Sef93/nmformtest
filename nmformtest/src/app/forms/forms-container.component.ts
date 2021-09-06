import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormService } from './form.service';

@Component({
  selector: 'app-forms-container',
  templateUrl: './forms-container.component.html',
  styleUrls: ['./forms-container.component.scss'],
})
export class FormsContainerComponent {

  constructor(private formService: FormService) {

   }



  loadJson(){
    this.formService.loadJSON();
  }

  get formData$(){
    return this.formService.formData$;
  }

}
