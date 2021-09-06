import { Validators } from "@angular/forms";
import { ButtonFunction } from "src/app/types/buttonTypes";
import { checkboxValidator, otherOptionFilled } from "src/app/types/customValidators";
import { FormType } from "src/app/types/formType";
import { InputType } from "src/app/types/inputType";

export const testJson: FormType = {
    fields: [
        {name: 'name', label: 'Név', type: InputType.text, placeholder: 'Név', validators: [Validators.required], outputText: 'A felhasználó neve {{name}}. '},
        {name: 'email', label: 'E-mail cím', type: InputType.text, placeholder: 'kurtossyo93@gmail.com', validators: [Validators.required, Validators.email], outputText: 'A felhasználó e-mail címe {{email}}. '},
        {name: 'birthDate', label: 'Születési idő', type: InputType.date, placeholder: '1993. 01. 23', validators: [Validators.required], outputText: 'A felhasználó {{birthDate}} éves. ', outputTextFormatFunction : (date)=>{return (new Date().getFullYear() - new Date(date).getFullYear()).toString()}},
        {name: 'gender', label: 'Nem', type: InputType.radio, validators: [Validators.required], options: [{label: 'Férfi', value: 'férfi'}, {label: 'Nő', value: 'nő'}, {label: 'Egyéb', value: 'egyéb'}], outputText: 'A felhasználó egy {{gender}}'},
        {name: 'hobbies', label: 'Hobbik', type: InputType.checkbox, validators: [checkboxValidator(), otherOptionFilled('other')], outputTextFormatFunction : (suboptionValues) => {return suboptionValuesFunction(suboptionValues, 'hobbies')}, outputText: 'A felhasználó hobbijai: {{hobbies}}. ', options: [
            {name: 'bike', label: 'Biciklizés', value: 'biciklizés'},
            {name: 'hiking', label: 'Sátrazás', value: 'sátrazás'},
            {name: 'grilling', label: 'Grillezés', value: 'grillezés'},
            {name: 'cooking', label: 'Sütés', value: 'sütés'},
            {name: 'other', label: 'Egyéb', value: '', activates: {
                label: 'Egyéb hobbi',
                name: 'other',
                type: InputType.text, 
                placeholder: 'Hobbi',
                outputText: "{{other}}",
            }},
        ]}
    ],
    buttons: [
        {label: 'Küldés', function: ButtonFunction.submit},
        {label: 'Reset', function: ButtonFunction.reset}
    ]
}

function suboptionValuesFunction (suboptionValues, key: string):string{

    const targetField = testJson.fields.find(field => field.name === key);
    let outputString = '';
    for(let key of Object.keys(suboptionValues)){
        if(suboptionValues[key]){
            if(key !== 'other' && key !== 'other-suboption'){
                outputString += targetField.options.find(option => option.name === key).value + ',';
            }else if(key === 'other-suboption'){
                outputString += suboptionValues[key] + ',';
            }

        }
    }
    outputString = outputString.slice(0, -1) + '.';

    return outputString;
}

