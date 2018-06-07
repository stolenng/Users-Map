import IUser from "../interfaces/IUser";

export default class User implements IUser {
    constructor(public id: string, public isActive: boolean, public age: number, public firstName: string,
                public lastName: string, public picture: string, public email: string, public latitude: number,
                public longitude: number) {}
}