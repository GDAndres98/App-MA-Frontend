import { Problem } from './problem';


export class Contest {
    public id:          number;
    public name:        string;
    public startTime:   Date;
    public endTime:     Date;
    public problems:    ProblemInContest[];
    public isValid:     boolean;
    public isPrivate:   boolean;
}

export class ProblemInContest {
    public id: number;
    public title: string;
    public letter: string;
}