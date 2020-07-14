import { Course } from './course';
import { Article } from './article';
import { Problem } from './problem';

export class Section{
    public id:          number;
    public title:       string;
    public description: string;
    public postedAt:    Course;
    public articles:    Article[];
    public orderSection:       number;
    public attached:    string;
    public problems:    Problem[];
}