export class UserModel{
    public id: string;
    public email: string;
    public pictureUrl: string;
    public balance: number;
    public country: string;
    public gender: string;
    public age: number;

    constructor(){
        this.id = null;
        this.email = null;
        this.pictureUrl = null;
        this.balance = null;
    }
}