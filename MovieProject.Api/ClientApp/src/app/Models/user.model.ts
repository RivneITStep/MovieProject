export class UserModel{
    public id: string;
    public email: string;
    public pictureUrl: string;
    public balance: number;

    constructor(){
        this.id = null;
        this.email = null;
        this.pictureUrl = null;
        this.balance = null;
    }
}