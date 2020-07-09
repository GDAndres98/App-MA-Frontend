import { Tag } from './tag';

export class Article {
    public id: number;
    public title: string;
    public author: string;
    public dateWritten: Date;
    public tags: Tag[];
    public markdown: string;
}
