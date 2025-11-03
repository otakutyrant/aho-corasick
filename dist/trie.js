"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Match = exports.defaultTrieOptions = exports.Trie = void 0;
var options_1 = require("./config/options");
Object.defineProperty(exports, "defaultTrieOptions", { enumerable: true, get: function () { return options_1.defaultTrieOptions; } });
var models_1 = require("./models");
Object.defineProperty(exports, "Match", { enumerable: true, get: function () { return models_1.Match; } });
var utils_1 = require("./utilities/utils");
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
var Trie = /** @class */ (function () {
    /**
     * @description
     * Trie constructor function.
     *
     * @param {Array<string>} [keywords] - An optional array of keywords to initialize the Trie with.
     * @param {Partial<TrieOptions>} [options] - Optional configuration options for the Trie.
     */
    function Trie(keywords, options) {
        this.failureStateConstructed = false;
        this.root = new models_1.State(0);
        this.options = __assign(__assign({}, options_1.defaultTrieOptions), options);
        if (keywords && (0, utils_1.isNonEmptyArray)(keywords)) {
            this.initialiseKeywords(keywords);
        }
    }
    /**
     * @description
     * Adds a keyword to the Trie.
     *
     * @param {string} keyword - The keyword to add to the Trie.
     * @throws {Error} Throws an error if the provided keyword is null or empty.
     * @returns {void}
     */
    Trie.prototype.addKeyword = function (keyword) {
        if ((0, utils_1.isNullOrEmptyString)(keyword)) {
            throw new Error('Provided string `keyword` is a null or empty string.');
        }
        var currentState = this.root;
        var kw = this.prepareKeywordForInsertion(keyword);
        for (var i = 0; i < kw.length; i++) {
            var char = kw.charAt(i);
            currentState = currentState.addState(char);
        }
        currentState.addMatch([kw]);
    };
    /**
     * @description
     * Parses the input text for keyword matches.
     *
     * @param {string} text - The text to parse for keyword matches.
     * @returns {Array<Match>} - An array of Match objects representing keyword matches.
     */
    Trie.prototype.getMatches = function (text) {
        this.checkForConstructedFailureStates();
        var currentState = this.root;
        var matches = [];
        if ((0, utils_1.isNullOrEmptyString)(text)) {
            return matches;
        }
        for (var pos = 0; pos <= text.length; pos++) {
            var char = this.options.caseSensitive
                ? text.charAt(pos)
                : text.charAt(pos).toLowerCase();
            currentState = this.getState(currentState, char);
            matches.push.apply(matches, this.toMatches(pos, currentState));
        }
        var filteredMatches = this.applyFilteringOptions(text, matches);
        return filteredMatches;
    };
    /**
     * @description
     * Retrieves all non-matching substrings in the input text.
     *
     * @param {string} text - The input text.
     * @returns {Array<string>} An array of non-matching substrings.
     */
    Trie.prototype.getNonMatches = function (text) {
        this.checkForConstructedFailureStates();
        var matches = this.getMatches(text);
        matches.sort(function (a, b) { return a.start - b.start; });
        var nonMatches = new Array();
        var currentIndex = 0;
        for (var _i = 0, matches_1 = matches; _i < matches_1.length; _i++) {
            var match = matches_1[_i];
            if (currentIndex < match.start) {
                nonMatches.push(text.slice(currentIndex, match.start));
            }
            currentIndex = match.end + 1;
        }
        if (currentIndex < text.length) {
            nonMatches.push(text.slice(currentIndex));
        }
        return nonMatches;
    };
    /**
     * @description
     * Retrieves an array of WordCount objects representing matched words and their total occurrences
     * in the input text.
     *
     * @param {string} text - The input text.
     * @returns {Array<WordCount>} An array of WordCount objects.
     */
    Trie.prototype.getStringOccurrences = function (text) {
        this.checkForConstructedFailureStates();
        var matches = this.getMatches(text);
        var wordCountMap = new Map();
        for (var _i = 0, matches_2 = matches; _i < matches_2.length; _i++) {
            var match = matches_2[_i];
            var keyword = match.keyword;
            var count = wordCountMap.get(keyword) || 0;
            wordCountMap.set(keyword, count + 1);
        }
        var wordCounts = Array.from(wordCountMap.entries()).map(function (_a) {
            var keyword = _a[0], occurrences = _a[1];
            return ({ keyword: keyword, occurrences: occurrences });
        });
        return wordCounts;
    };
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
    Trie.prototype.initialiseKeywords = function (keywords) {
        var _this = this;
        var caseTransform = this.options.caseSensitive
            ? function (x) { return x; }
            : function (x) { return x.toLowerCase(); };
        var trimWhiteSpace = this.options.removeWhiteSpaces
            ? function (x) { return x; }
            : function (x) { return x.trim(); };
        keywords.forEach(function (kw) {
            return _this.addKeyword(trimWhiteSpace(caseTransform(kw)));
        });
    };
    /**
     * @description
     * Prepares a keyword for insertion into the Trie based on the specified options.
     *
     * @param {string} keyword - The original keyword to prepare.
     * @private
     * @returns {string} The prepared keyword.
     */
    Trie.prototype.prepareKeywordForInsertion = function (keyword) {
        var _this = this;
        var transformCase = function (x) {
            return _this.options.caseSensitive ? x : x.toLowerCase();
        };
        var trimWhitespace = function (x) {
            return _this.options.removeWhiteSpaces ? x.trim() : x;
        };
        return trimWhitespace(trimWhitespace(transformCase(keyword)));
    };
    /**
     * @description
     * Applies filtering options to the list of matches.
     *
     * @param {string} text - The input text.
     * @param {Array<Match>} matches - The list of matches.
     * @returns {Array<Match>} The filtered list of matches.
     * @private
     */
    Trie.prototype.applyFilteringOptions = function (text, matches) {
        var partialMatchesRemoved = this.options.wholeWords
            ? this.removePartialMatches(text, matches)
            : matches;
        var overlapsFiltered = !this.options.allowOverlap
            ? new models_1.Tree(partialMatchesRemoved).removeOverlappingSegments(partialMatchesRemoved)
            : partialMatchesRemoved;
        return overlapsFiltered;
    };
    /**
     * @description
     * Retrieves the next state based on the current state and a character.
     *
     * @param {State} currentState - The current state in the Trie.
     * @param {string} char - The character to transition to the next state.
     * @private
     * @returns {State} The next state in the Trie.
     */
    Trie.prototype.getState = function (currentState, char) {
        var state = currentState;
        var newCurrentState = currentState.nextState(char);
        while (newCurrentState === null) {
            state = state.failure;
            newCurrentState = state.nextState(char);
        }
        return newCurrentState;
    };
    /**
     * @description
     * Checks if failure states have been constructed and constructs them if necessary.
     *
     * @private
     * @returns {void}
     */
    Trie.prototype.checkForConstructedFailureStates = function () {
        if (!this.failureStateConstructed) {
            this.constructFailureStates();
        }
    };
    /**
     * @description
     * Constructs failure states for each state in the Trie.
     *
     * @private
     * @returns {void}
     */
    Trie.prototype.constructFailureStates = function () {
        var _this = this;
        var queue = [];
        this.root.failure = this.root;
        this.root.successes.forEach(function (depthOneState) {
            depthOneState.failure = _this.root;
            queue.push(depthOneState);
        });
        var _loop_1 = function () {
            var currentState = queue.shift();
            currentState.transitions.forEach(function (transition) {
                var targetState = currentState.nextState(transition);
                queue.push(targetState);
                var traceFailureState = currentState.failure;
                while (traceFailureState.nextState(transition) === null) {
                    traceFailureState = traceFailureState.failure;
                }
                var newFailureState = traceFailureState.nextState(transition);
                targetState.failure = newFailureState;
                targetState.addMatch(newFailureState.match);
            });
        };
        while (queue.length > 0) {
            _loop_1();
        }
        this.failureStateConstructed = true;
    };
    /**
     * @description
     * Removes partial matches from the list of emits based on the search text.
     *
     * @param {string} text - The search text.
     * @param {Match[]} matches - The list of emitted matches.
     * @private
     * @returns {Match[]} The filtered list of matches.
     */
    Trie.prototype.removePartialMatches = function (text, matches) {
        var start = text.length;
        return matches.filter(function (match) {
            return ((match.start === 0 || !(0, utils_1.isAlphanumeric)(text.charAt(match.start - 1))) &&
                (match.end + 1 == start || !(0, utils_1.isAlphanumeric)(text.charAt(match.end + 1))));
        });
    };
    /**
     * @description
     * Converts Trie matches to Match objects.
     *
     * @param {number} end - The end index of the match.
     * @param {State} state - The current state in the Trie.
     * @private
     * @returns {Match[]} The list of Match objects.
     */
    Trie.prototype.toMatches = function (end, state) {
        var matches = state.match;
        return matches.map(function (match) {
            return new models_1.Match(end - match.length + 1, end, match);
        });
    };
    return Trie;
}());
exports.Trie = Trie;
