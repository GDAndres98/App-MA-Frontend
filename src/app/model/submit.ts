import { Problem } from './problem';

export enum Language{
    Java_1_8    = "Java 1.8",
    Phyton_3    = "Phyton 3",
    Cpp_11      = "C++ 11"
}

export enum Veredict{
	In_Queue            = "var(--in-queue)",
	Accepted            = "var(--accepted)",
	Wrong_Answer        = "var(--wrong-answer)",
	Time_Limit          = "var(--time-limit)",
	Memory_Limit        = "var(--memory-limit)",
	Compilation_Error   = "var(--compilation-error)", 
	Presentation_Error  = "var(--presentation-error)",
}

export class Submit {
    public id: number;
    public language: Language;
    public veredict: Veredict;
    public memoryConsumed: number;
    public timeConsumed: number;
    public submitDate: Date;
    public problem: Problem;
}
