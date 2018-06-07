import { IActions, ActionsEnum } from "../interfaces/IActions";

export default class Actions implements IActions {
    constructor(public action: ActionsEnum, public item: any) {}
}