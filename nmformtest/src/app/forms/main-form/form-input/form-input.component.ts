import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FieldType } from 'src/app/types/fieldType';
import { InputType } from 'src/app/types/inputType';
@Component({
  selector: 'app-form-input',
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.scss']
})
export class FormInputComponent implements OnInit {
  InputType = InputType;
  errorDictionary = {
    "required" : "A mező kitöltése kötelező.",
    "email" : "Nem megfelelő formátumú adat.",
    "atLeastOneTrue" : "Legalább egy kiválasztása szükséges!",
    "emptySuboptionValue" : "Egyéb opció kitöltése kötelező"
  }
  @Input() fc: FormControl;
  @Input() field: FieldType;
  @Input() isSubmitted : boolean;
  constructor() {

   }

  ngOnInit(): void {
  }

  get errorMsg(){
    return this.errorDictionary[Object.keys(this.fc.errors)[0]]
  }


}
