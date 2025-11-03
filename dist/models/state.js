"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.State = void 0;
/**
 * @class State
 * @classdesc Represents a state in a finite state machine. A `State` has the following functions:
 *  - `success`: Successfully transferred to another state.
 *  - `failure`: If it is not possible to jump along the string, jump to a shallower node.
 *  - `match`: Where a pattern string has been matched relative to input.
 *
 * The root node is slightly different. The root node does not have a failure function.
 * Its _failure_ refers to moving to the next state according to the string path.
 * Other nodes do have `failure` states.
 */
var State = /** @class */ (function () {
    /**
     * @description
     * Creates a new State with the specified depth.
     *
     * @param {number} d - The depth of the state in the state machine hierarchy.
     */
    function State(d) {
        this._fail = null;
        this._match = [];
        this._success = new Map();
        this._depth = d;
    }
    Object.defineProperty(State.prototype, "failure", {
        /**
         * @description
         * Gets the failure state associated with this state.
         */
        get: function () {
            return this._fail;
        },
        /**
         * @description
         * Sets the failure state associated with this state.
         *
         * @param {State | null} s - The failure state to be set.
         */
        set: function (s) {
            this._fail = s;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(State.prototype, "depth", {
        /**
         * @description
         * Gets the depth of the state in the state machine hierarchy.
         */
        get: function () {
            return this._depth;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(State.prototype, "match", {
        /**
         * @description
         * Gets an array of strings representing keywords associated with this state.
         */
        get: function () {
            return this._match;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(State.prototype, "successes", {
        /**
         * @description
         * Gets an array of next states reachable from this state.
         */
        get: function () {
            return Array.from(this._success.values());
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(State.prototype, "transitions", {
        /**
         * @description
         * Gets an array of transition characters associated with next states.
         */
        get: function () {
            return Array.from(this._success.keys());
        },
        enumerable: false,
        configurable: true
    });
    /**
     * @description
     * Adds keywords to the list of strings representing keywords associated with this state.
     *
     * @param {string[]} keywords - An array of strings representing keywords to be added.
     */
    State.prototype.addMatch = function (keywords) {
        var _a;
        (_a = this._match).push.apply(_a, keywords);
    };
    /**
     * @description
     * Gets the next state associated with the specified character.
     *
     * @param {string} char - The transition character.
     * @param {boolean} ignoreRoot - If true, ignore the root state when transitioning.
     * @returns {State | null} The next state, or null if no next state is found.
     */
    State.prototype.nextState = function (char, ignoreRoot) {
        if (ignoreRoot === void 0) { ignoreRoot = false; }
        var nextState = this._success.get(char);
        return nextState !== undefined
            ? nextState
            : (!ignoreRoot && this.root) || null;
    };
    /**
     * @description
     * Adds a new state for the specified character and returns the added state.
     *
     * @param {string} char - The transition character.
     * @returns {State} The added state.
     */
    State.prototype.addState = function (char) {
        var _a;
        var next = (_a = this.nextState(char, true)) !== null && _a !== void 0 ? _a : new State(this.depth + 1);
        this._success.set(char, next);
        return next;
    };
    Object.defineProperty(State.prototype, "root", {
        /**
         * @description
         * Gets the root state if the depth is 0, otherwise returns null.
         */
        get: function () {
            return this._depth === 0 ? this : null;
        },
        enumerable: false,
        configurable: true
    });
    return State;
}());
exports.State = State;
