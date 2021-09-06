import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { ButtonFunction } from 'src/app/types/buttonTypes';
import { FieldType } from 'src/app/types/fieldType';
import { FormType } from 'src/app/types/formType';
import { InputType } from 'src/app/types/inputType';
import { OptionType } from 'src/app/types/optionType';
import { FormService } from '../form.service';

@Component({
  selector: 'app-main-form',
  templateUrl: './main-form.component.html',
  styleUrls: ['./main-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainFormComponent implements OnInit {
  form: FormGroup;
  isSubmitted: boolean = false;
  submitSubscription$: Subscription;
  @Input() formData : FormType;
  constructor(private fb: FormBuilder, private formService: FormService) { 

    this.formService.formData$.subscribe((formData)=>{
      if(formData){
        this.formData = formData;
        this.initForm();
      }else{
        this.formService.navigateToRoot();
      }
    })
  }
  ngOnInit(): void {

  }

  initForm(){
    if(!this.formService.formGroupValue){
      this.form = this.fb.group({});
      this.formData.fields.forEach(field => {
        if(field.type !== InputType.checkbox){
          this.createFormControl(field);
        }
        else{
          this.createSubgroupControls(field, field.options)
        }
      })
      this.submitSubscription$ = this.form.valueChanges.subscribe(()=>{
        this.isSubmitted = false;
      })
    }else{
      this.form = this.formService.formGroupValue;
    }

  }

  createFormControl(field: FieldType){
    this.form.addControl(field.name, new FormControl(null, field.validators));
  }

  createSubgroupControls(field: FieldType, options: OptionType[]){
    const controls:{[key:string]:FormControl} = {};
    for(let option of options){
      controls[option.name] =  new FormControl();
      if(option.activates){
        controls[option.name + '-suboption'] = new FormControl();
      }
    }
  
    const group = new FormGroup(controls, field.validators);
    this.form.addControl(field.name, group);
  }

  submitForm(){
    this.isSubmitted = true;
    if(this.form.valid){
      this.formService.createScript(this.form, this.formData);
    }


  }

  resetForm(){
    this.form.reset();
  }

  buttonFunction(buttonFunction: ButtonFunction){
    if(buttonFunction === ButtonFunction.submit){
      this.submitForm();
    }
    if(buttonFunction === ButtonFunction.reset){
      this.resetForm();
    }
  }

  get solvedScript$(){
    return this.formService.solvedScript$;
  }

  ngOnDestroy(){
    if(this.submitSubscription$)
    this.submitSubscription$.unsubscribe();
  }


}
