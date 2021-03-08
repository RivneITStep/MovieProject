export class RegisterModel{
    public email: string;
    public password: string;
    public country: string;
    public gender: string;
    public age: number;

    constructor(){
        this.email = null;
        this.password = null;
    }
}