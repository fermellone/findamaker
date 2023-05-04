import type { SolutionUpVote as PrismaSolutionVote } from '@prisma/client';
import type { Problem } from './problem';
import type { User } from './user';
import type { Solution } from './solution';

export type SolutionUpVote = PrismaSolutionVote & { problem: Problem; user: User, solution: Solution };
