import { Problem } from './problem';


export class Contest {
    public id: number;
    public name: string;
    public startTime: Date;
    public endTime: Date;
    public problem: Problem[];
}