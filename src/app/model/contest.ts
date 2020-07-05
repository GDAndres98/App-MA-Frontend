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
    public id:             number;
    public position:       number;
    public username:       string;
    public name:           string;
    public generalPenalty: number;
    public problemsSolved: number;
    public problemsScore:   ProblemScore[];
}

export class ProblemScore {
    public id:         number;
    public penalty:    number;
    public tries:      number;
    public solved:     boolean;
}