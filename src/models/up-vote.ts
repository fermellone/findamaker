import type { UpVote as UpVotePrisma } from '@prisma/client';
import type { Problem } from './problem';
import type { User } from './user';

export type UpVote = UpVotePrisma & { problem: Problem; user: User };
