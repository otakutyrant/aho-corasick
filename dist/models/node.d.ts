import { Segment } from '../models';
/**
 * @class Node
 * @classdesc Represents a binary search tree node for managing segments.
 */
export declare class Node {
    private midPoint;
    private segments;
    private left;
    private right;
    /**
     * @description
     * Constructs a Node with the given segments and initializes its properties.
     *
     * @param {Array<Segment>} segments The segments to be managed by the node.
     */
    constructor(segments: Array<Segment>);
    /**
     * @description
     * Gets overlapping segments with the given segment.
     *
     * @param {Segment} s The segment to check for overlapping segments.
     * @returns {Array<Segment>} An array of overlapping segments.
     */
    getOverlappingSegments(s: Segment): Array<Segment>;
    /**
     * @description
     * Gets overlapping segments in a specific direction relative to the given segment.
     *
     * @param {Segment} s The segment to check for overlapping segments.
     * @param {Direction} dir The direction (LEFT or RIGHT) to search for overlapping segments.
     * @returns {Array<Segment>} An array of overlapping segments in the specified direction.
     */
    private getDirectionalOverlappingSegments;
    /**
     * @description
     * Calculates the midpoint of the given segments.
     *
     * @param {Array<Segment>} segments The segments to calculate the midpoint from.
     * @returns {number} The midpoint value.
     */
    private getMidPoint;
}
