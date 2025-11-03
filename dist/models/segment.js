"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Segment = void 0;
/**
 * @class Segment
 * @classdesc Represents a closed interval (segment) in mathematics.
 * A closed interval is a set of points between two values (a and end),
 * where both endpoints are included in the interval.
 */
var Segment = /** @class */ (function () {
    /**
     * @description
     * Creates a new closed interval (segment) with specified start and end points.
     *
     * @param start The starting point of the interval.
     * @param end The ending point of the interval.
     */
    function Segment(start, end) {
        this.start = start;
        this.end = end;
    }
    /**
     * @description
     * Checks if this interval is equal to another interval.
     *
     * @param {Segment} comparison The interval to compare with.
     * @returns {boolean} True if the intervals are equal, false otherwise.
     */
    Segment.prototype.isEqual = function (comparison) {
        return this.start === comparison.start && this.end === comparison.end;
    };
    /**
     * @description
     * Calculates and returns the size of the interval.
     * The size of the interval is the number of points it contains.
     *
     * @returns {number} The size of the interval.
     */
    Segment.prototype.size = function () {
        return this.end - this.start + 1;
    };
    return Segment;
}());
exports.Segment = Segment;
