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
export declare class State {
    private _fail;
    private readonly _depth;
    private readonly _match;
    private readonly _success;
    /**
     * @description
     * Creates a new State with the specified depth.
     *
     * @param {number} d - The depth of the state in the state machine hierarchy.
     */
    constructor(d: number);
    /**
     * @description
     * Gets the failure state associated with this state.
     */
    get failure(): State | null;
    /**
     * @description
     * Sets the failure state associated with this state.
     *
     * @param {State | null} s - The failure state to be set.
     */
    set failure(s: State | null);
    /**
     * @description
     * Gets the depth of the state in the state machine hierarchy.
     */
    get depth(): number;
    /**
     * @description
     * Gets an array of strings representing keywords associated with this state.
     */
    get match(): string[];
    /**
     * @description
     * Gets an array of next states reachable from this state.
     */
    get successes(): State[];
    /**
     * @description
     * Gets an array of transition characters associated with next states.
     */
    get transitions(): string[];
    /**
     * @description
     * Adds keywords to the list of strings representing keywords associated with this state.
     *
     * @param {string[]} keywords - An array of strings representing keywords to be added.
     */
    addMatch(keywords: string[]): void;
    /**
     * @description
     * Gets the next state associated with the specified character.
     *
     * @param {string} char - The transition character.
     * @param {boolean} ignoreRoot - If true, ignore the root state when transitioning.
     * @returns {State | null} The next state, or null if no next state is found.
     */
    nextState(char: string, ignoreRoot?: boolean): State | null;
    /**
     * @description
     * Adds a new state for the specified character and returns the added state.
     *
     * @param {string} char - The transition character.
     * @returns {State} The added state.
     */
    addState(char: string): State;
    /**
     * @description
     * Gets the root state if the depth is 0, otherwise returns null.
     */
    get root(): State | null;
}
