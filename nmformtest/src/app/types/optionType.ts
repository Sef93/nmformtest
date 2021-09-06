import { FieldType } from "./fieldType";

export interface OptionType{
    label: string;
    value: string;
    name?: string;
    activates? : FieldType
}