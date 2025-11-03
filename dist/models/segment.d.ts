/**
 * @class Segment
 * @classdesc Represents a closed interval (segment) in mathematics.
 * A closed interval is a set of points between two values (a and end),
 * where both endpoints are included in the interval.
 */
export declare class Segment {
    readonly start: number;
    readonly end: number;
    /**
     * @description
     * Creates a new closed interval (segment) with specified start and end points.
     *
     * @param start The starting point of the interval.
     * @param end The ending point of the interval.
     */
    constructor(start: number, end: number);
    /**
     * @description
     * Checks if this interval is equal to another interval.
     *
     * @param {Segment} comparison The interval to compare with.
     * @returns {boolean} True if the intervals are equal, false otherwise.
     */
    isEqual(comparison: Segment): boolean;
    /**
     * @description
     * Calculates and returns the size of the interval.
     * The size of the interval is the number of points it contains.
     *
     * @returns {number} The size of the interval.
     */
    size(): number;
}
