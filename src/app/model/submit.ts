import { Problem } from './problem';

export enum Language{
    Java_1_8    = "Java 1.8",
    Phyton_3    = "Phyton 3",
    Cpp_11      = "C++ 11"
}

export enum Veredict{
	IN_QUEUE            = "var(--in-queue)",
	ACCEPTED            = "var(--accepted)",
	WRONG_ANSWER        = "var(--wrong-answer)",
	TIME_LIMIT          = "var(--time-limit)",
	MEMORY_LIMIT        = "var(--memory-limit)",
	COMPILATION_ERROR   = "var(--compilation-error)", 
	PRESENTATION_ERROR  = "var(--presentation-error)",
	RUNTIME_ERROR       = "var(--runtime-error)",
}

export class Submit {
    public id: number;
    public username: string;
    public language: Language;
    public veredict: Veredict;
    public memoryConsumed: number;
    public timeConsumed: number;
    public submitDate: Date;
    public problem: Problem;
}
