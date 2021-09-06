import { Validator, ValidatorFn, Validators } from "@angular/forms";
import { InputType } from "./inputType";
import { OptionType } from "./optionType";

export interface FieldType{
    name: string;
    type: InputType,
    label: string,
    validators?: Array<ValidatorFn>
    placeholder? : string,
    options? : Array<OptionType>;
    outputText: string;
    outputTextFormatFunction? : (input:string)=>string;
}