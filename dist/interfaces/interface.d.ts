/**
 * @description
 * Options for configuring the behavior of a Trie.
 */
export interface TrieOptions {
    allowOverlap: boolean;
    caseSensitive: boolean;
    removeWhiteSpaces: boolean;
    wholeWords: boolean;
}
/**
 * @description
 * Enum utilised for identifying path direction, e.g., left or right in the tree.
 */
export declare enum Direction {
    LEFT = "Left",
    RIGHT = "Right"
}
/**
 * @description
 * Basic interface for storing of the number of times a given keyword is matched.
 */
export interface WordCount {
    keyword: string;
    occurrences: number;
}
