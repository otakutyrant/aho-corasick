"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tree = void 0;
var models_1 = require("../models");
/**
 * @class Tree
 * @classdesc Represents a tree structure for managing segments and removing overlapping segments.
 */
var Tree = /** @class */ (function () {
    /**
     * @description
     * Creates a new tree with the specified segments.
     *
     * @param {Array<Segment>} segments An array of segments to initialize the tree.
     */
    function Tree(segments) {
        this.root = new models_1.Node(segments);
    }
    /**
     * @description
     * Removes overlapping segments from the given array of segments.
     *
     * @param {Array<T>} segments An array of segments to remove overlaps from.
     * @returns {Array<T>} An array of segments without overlapping segments.
     */
    Tree.prototype.removeOverlappingSegments = function (segments) {
        var _this = this;
        var removed = new Array();
        var sortedSegments = segments.slice().sort(function (a, b) { return b.size() - a.size(); });
        for (var _i = 0, sortedSegments_1 = sortedSegments; _i < sortedSegments_1.length; _i++) {
            var segment = sortedSegments_1[_i];
            if (!this.hasSegment(removed, segment)) {
                removed.push.apply(removed, this.root
                    .getOverlappingSegments(segment)
                    .filter(function (o) { return !_this.hasSegment(removed, o); }));
            }
        }
        return segments
            .slice()
            .sort(function (a, b) { return a.start - b.start; })
            .filter(function (s) { return !_this.hasSegment(removed, s); });
    };
    /**
     * @description
     * Checks if a segment is present in the array of segments.
     *
     * @param {Array<Segment>} segments An array of segments to check against.
     * @param {Segment} s The segment to check for.
     * @returns {boolean} True if the segment is present, false otherwise.
     */
    Tree.prototype.hasSegment = function (segments, s) {
        return segments.some(function (n) { return n.isEqual(s); });
    };
    return Tree;
}());
exports.Tree = Tree;
