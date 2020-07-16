import { Submit } from './submit';

export class User {
    public id       :number
    public username : string;
    public email    : string;
    public firstName: string;
    public lastName : string;
    public rating   : number;
    public admin    : boolean;

    public submit   : Submit;       // esto es por pereza, salu2
}

export class UserLogin {
    public firstName:   string;
    public lastName:    string;
    public userName:    string;
    public email:       string;
    public password:    string;
}
