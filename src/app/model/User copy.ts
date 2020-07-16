export class User {
    public id       :number
    public username : string;
    public email    : string;
    public firstName: string;
    public lastName : string;
    public rating   : number;
    public admin    : boolean;
}

export class UserLogin {
    public firstName:   string;
    public lastName:    string;
    public userName:    string;
    public email:       string;
    public password:    string;
}
