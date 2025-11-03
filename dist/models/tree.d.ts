import { Segment } from '../models';
/**
 * @class Tree
 * @classdesc Represents a tree structure for managing segments and removing overlapping segments.
 */
export declare class Tree {
    private root;
    /**
     * @description
     * Creates a new tree with the specified segments.
     *
     * @param {Array<Segment>} segments An array of segments to initialize the tree.
     */
    constructor(segments: Array<Segment>);
    /**
     * @description
     * Removes overlapping segments from the given array of segments.
     *
     * @param {Array<T>} segments An array of segments to remove overlaps from.
     * @returns {Array<T>} An array of segments without overlapping segments.
     */
    removeOverlappingSegments<T extends Segment>(segments: Array<T>): Array<T>;
    /**
     * @description
     * Checks if a segment is present in the array of segments.
     *
     * @param {Array<Segment>} segments An array of segments to check against.
     * @param {Segment} s The segment to check for.
     * @returns {boolean} True if the segment is present, false otherwise.
     */
    private hasSegment;
}
