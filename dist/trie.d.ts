import { defaultTrieOptions } from './config/options';
import { Match } from './models';
import { TrieOptions, WordCount } from './interfaces';
/**
 * @class Trie
 * @classdesc Represents a Trie data structure for storing and searching keywords. This is a port
 * of the following implmentations:
 *  - [Efficient String Matching: An Aid to Bibliographic Search](http://cr.yp.to/bib/1975/aho.pdf)
 *  - [robert-bor/aho-corasick](https://github.com/robert-bor/aho-corasick)
 *  - [hankcs/aho-corasick](https://github.com/hankcs/aho-corasick)
 *  - [tanishiking/aho-corasick-js](https://github.com/tanishiking/aho-corasick-js)
 *
 * This implementation adds several additional features, including:
 *  - Extended case sensitivity & trimming of white spaces.
 */
export declare class Trie {
    private failureStateConstructed;
    private readonly root;
    private options;
    /**
     * @description
     * Trie constructor function.
     *
     * @param {Array<string>} [keywords] - An optional array of keywords to initialize the Trie with.
     * @param {Partial<TrieOptions>} [options] - Optional configuration options for the Trie.
     */
    constructor(keywords?: Array<string>, options?: Partial<TrieOptions>);
    /**
     * @description
     * Adds a keyword to the Trie.
     *
     * @param {string} keyword - The keyword to add to the Trie.
     * @throws {Error} Throws an error if the provided keyword is null or empty.
     * @returns {void}
     */
    addKeyword(keyword: string): void;
    /**
     * @description
     * Parses the input text for keyword matches.
     *
     * @param {string} text - The text to parse for keyword matches.
     * @returns {Array<Match>} - An array of Match objects representing keyword matches.
     */
    getMatches(text: string): Array<Match>;
    /**
     * @description
     * Retrieves all non-matching substrings in the input text.
     *
     * @param {string} text - The input text.
     * @returns {Array<string>} An array of non-matching substrings.
     */
    getNonMatches(text: string): Array<string>;
    /**
     * @description
     * Retrieves an array of WordCount objects representing matched words and their total occurrences
     * in the input text.
     *
     * @param {string} text - The input text.
     * @returns {Array<WordCount>} An array of WordCount objects.
     */
    getStringOccurrences(text: string): Array<WordCount>;
    /**
     * @description
     * Initializes the Trie with an array of keywords. These keywords are parsed respective
     * to the provided options `caseSensitive` and `removeWhiteSpaces` where strings are
     * flipped to lower case when the former is `true` and white spaces are trimmed when the
     * latter is `true`.
     *
     * @param {Array<string>} keywords - An array of keywords to add to the Trie.
     * @private
     * @returns {void}
     */
    private initialiseKeywords;
    /**
     * @description
     * Prepares a keyword for insertion into the Trie based on the specified options.
     *
     * @param {string} keyword - The original keyword to prepare.
     * @private
     * @returns {string} The prepared keyword.
     */
    private prepareKeywordForInsertion;
    /**
     * @description
     * Applies filtering options to the list of matches.
     *
     * @param {string} text - The input text.
     * @param {Array<Match>} matches - The list of matches.
     * @returns {Array<Match>} The filtered list of matches.
     * @private
     */
    private applyFilteringOptions;
    /**
     * @description
     * Retrieves the next state based on the current state and a character.
     *
     * @param {State} currentState - The current state in the Trie.
     * @param {string} char - The character to transition to the next state.
     * @private
     * @returns {State} The next state in the Trie.
     */
    private getState;
    /**
     * @description
     * Checks if failure states have been constructed and constructs them if necessary.
     *
     * @private
     * @returns {void}
     */
    private checkForConstructedFailureStates;
    /**
     * @description
     * Constructs failure states for each state in the Trie.
     *
     * @private
     * @returns {void}
     */
    private constructFailureStates;
    /**
     * @description
     * Removes partial matches from the list of emits based on the search text.
     *
     * @param {string} text - The search text.
     * @param {Match[]} matches - The list of emitted matches.
     * @private
     * @returns {Match[]} The filtered list of matches.
     */
    private removePartialMatches;
    /**
     * @description
     * Converts Trie matches to Match objects.
     *
     * @param {number} end - The end index of the match.
     * @param {State} state - The current state in the Trie.
     * @private
     * @returns {Match[]} The list of Match objects.
     */
    private toMatches;
}
export { TrieOptions, defaultTrieOptions, Match };
