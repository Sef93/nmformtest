import { Component, OnInit } from '@angular/core';
import { FormService } from '../form.service';
import { map } from 'rxjs/operators';
import { FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-output',
  templateUrl: './output.component.html',
  styleUrls: ['./output.component.scss']
})
export class OutputComponent implements OnInit {
  editMode: boolean = false;
  script = new FormControl(null, Validators.required);
  constructor(private formService: FormService) {
    this.formService.solvedScript$.subscribe((script)=>{
      if(!script){
        this.formService.navigateToRoot();
      }else{
        this.script.setValue(script);
      }
    })
   }

  ngOnInit(): void {
  }

  editForm(){
    this.formService.navigateToForm();
  }

  saveChanges(){
    if(this.script.valid){
      this.formService.changeScript(this.script.value);
      this.editMode = false;
    }

  }

  edit(){
    this.editMode = true;
  }

  copy(){
    navigator.clipboard.writeText(this.script.value);
  }

  get solvedScript$(){
    return this.formService.solvedScript$;
  }

}
