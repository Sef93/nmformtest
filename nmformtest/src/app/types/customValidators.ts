import { AbstractControl, FormGroup, ValidationErrors, Validator, ValidatorFn } from "@angular/forms";

export function checkboxValidator(): ValidatorFn {
    return (group: FormGroup): ValidationErrors | null => {
        for(let control of Object.keys(group.controls)){
            if(group.get(control).value){
                return null;
            }
        }
        

        return { 'atLeastOneTrue' : true};
    }
}

export function otherOptionFilled(otherOptionName: string) : ValidatorFn {
    return (group: FormGroup): ValidationErrors | null => {
        if(group.get(otherOptionName).value && !!!group.get(otherOptionName + '-suboption').value){
            return { 'emptySuboptionValue' : true}
        }
        return null;
    }
}