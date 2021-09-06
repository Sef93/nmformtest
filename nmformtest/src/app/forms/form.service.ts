import { Injectable, NgZone } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { testJson } from 'src/assets/test-data/test-json';
import { FormType } from '../types/formType';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  private _formData$ = new BehaviorSubject<FormType>(null);
  private _solvedScript$ = new BehaviorSubject<string>(null);
  private _formGroup$ = new BehaviorSubject<FormGroup>(null);
  constructor(private router: Router, private ngZone: NgZone) {
   }

  loadJSON(){
    this._formData$.next(testJson);
    this.navigateToForm();
  }

  public createScript(formGroup: FormGroup, formData: FormType){
    this._formGroup$.next(formGroup);
    let outputScript: string = '';
    for(let formControl in formGroup.controls){
      const input = formData.fields.find(data => data.name === formControl);
      outputScript += input.outputText.replace(`{{${formControl}}}`, input.outputTextFormatFunction ? input.outputTextFormatFunction(formGroup.controls[formControl].value) : formGroup.controls[formControl].value);
    }
    this._solvedScript$.next(outputScript);
    this.navigateToOutput();
  }

  public changeScript(script: string){
    this._solvedScript$.next(script);
  }

  navigateToForm(){
    this.ngZone.run(()=>{
      this.router.navigate(['/form']);
    })
  }

  navigateToRoot(){
    this.ngZone.run(()=>{
      this.router.navigate(['']);
    })
  }

  navigateToOutput(){
    this.ngZone.run(()=>{
      this.router.navigate(['/output']);
    })
  }

  get solvedScript$(){
    return this._solvedScript$.asObservable();
  }

  get formData$(){
    return this._formData$.asObservable();
  }

  get formGroupValue(){
    return this._formGroup$.value;
  }


}
