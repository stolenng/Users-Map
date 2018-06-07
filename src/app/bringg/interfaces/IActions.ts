export enum ActionsEnum {
    Init = 1,
    Add = 2,
    Remove =3
}

export interface IActions {
    action: ActionsEnum;
    item: any;
}