import type {TweetAuthor} from "./tweet-author";


export interface Tweet {
    id: string;
    text: string;
    retweet_count: number;
    like_count: number;
    user: TweetAuthor;
}