import { ButtonTypes } from "./buttonTypes";
import { FieldType } from "./fieldType";

export interface FormType{
    fields: Array<FieldType>,
    buttons: Array<ButtonTypes>
}