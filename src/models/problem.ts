import type { Problem as PrismaProblem } from '@prisma/client';

import type { User } from './user';
import type { UpVote } from './up-vote';

export type Problem = PrismaProblem & { upVotes: UpVote[]; author: User };
