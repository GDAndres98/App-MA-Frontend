import { User } from './User';

export class Course{
    public id: number;
    public name: string;
    public logoUrl: string;
    public professor: User;
    public contestId: number;
}

export class UserCourse{
    public id: IDUserCourse;
    public student: User;
}

export class IDUserCourse{
    public studentId: number;
    public courseId: number;
}