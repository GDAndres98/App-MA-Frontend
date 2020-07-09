import { Contest } from './contest';
import { Article } from './article';

export class Level{
    public id: number;
    public name: string;
    public logo: string;
    public problems: Contest;
    public articles: Article[];
}