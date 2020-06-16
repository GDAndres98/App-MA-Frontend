import { Course } from './course';
import { Article } from './article';

export class Section{
    public id:          number;
    public title:       string;
    public description: string;
    public postedAt:    Course;
    public articles:    Article[];
}