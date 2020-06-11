import { User } from './User';

export class Course{
    public id: number;
    public name: string;
    public logoUrl: string;
    public professor: User;
}