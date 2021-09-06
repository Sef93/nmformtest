export interface ButtonTypes{
    label: string;
    function: ButtonFunction
}

export enum ButtonFunction{
    reset,
    submit
}