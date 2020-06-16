import { UserCourse } from './course';

export class Post {
    public id: number;
    public title: string;
    public author: string;
    public creationDate: Date;
    public userCourse: UserCourse;
    public content: string;
}
