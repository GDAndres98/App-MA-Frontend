import { Problem } from './problem';


export class ContestStats {
    public contest: Contest;
    public stats:   ProblemStats[];
}

export class Contest {
    public id:          number;
    public name:        string;
    public startTime:   Date;
    public endTime:     Date;
    public problems:    ProblemInContest[];
    public isValid:     boolean;
}

export class ProblemInContest {
    public id:      number;
    public title:   string;
    public letter:  string;
}

export class ProblemStats {
    public id:          number;
    public accepted:    number;
    public attempted:   number;
}

export class Scoreboard {
    public stats: UserStats[];
}

export class UserStats {
    private id:             number;
    private position:       number;
    private username:       string;
    private name:           string;
    private generalPenalty: number;
    private problemsSolved: number;
    private problemScore:   ProblemScore[];
}

export class ProblemScore {
    private id:         number;
    private penalty:    number;
    private tries:      string;
    private solved:     boolean;
}