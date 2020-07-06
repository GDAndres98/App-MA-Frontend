import { TagItem } from './tag';

export class Problem {
    public id: number;
    public title: string;
    public author: string;
    public createAt: Date;
    public timeLimit: number;
    public memoryLimit: number;
    public tags: TagItem[];
    public markdown: string;
    public letter: string; // Ignorelo, lo usé solo por pereza, salu2
}
