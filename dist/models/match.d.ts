import { Segment } from './segment';
/**
 * @class Match
 * @classdesc A match result for a given string corresponding to a segment within a `Trie`.
 * @extends Segment
 */
export declare class Match extends Segment {
    readonly start: number;
    readonly end: number;
    readonly keyword: string;
    constructor(start: number, end: number, keyword: string);
}
