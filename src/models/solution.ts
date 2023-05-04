import type { Solution as PrismaSolution } from '@prisma/client';

import type { User } from './user';
import type { Problem } from './problem';
import type {SolutionUpVote} from './solution-up-vote';

export type Solution = PrismaSolution & { upVotes: SolutionUpVote[]; author: User; problem: Problem };
