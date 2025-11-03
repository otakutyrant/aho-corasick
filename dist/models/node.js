"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Node = void 0;
var interfaces_1 = require("../interfaces");
/**
 * @class Node
 * @classdesc Represents a binary search tree node for managing segments.
 */
var Node = /** @class */ (function () {
    /**
     * @description
     * Constructs a Node with the given segments and initializes its properties.
     *
     * @param {Array<Segment>} segments The segments to be managed by the node.
     */
    function Node(segments) {
        var _this = this;
        this.segments = new Array();
        this.left = null;
        this.right = null;
        this.midPoint = this.getMidPoint(segments);
        var paths = [
            new Array(),
            new Array()
        ];
        segments.forEach(function (s) {
            if (s.end < _this.midPoint)
                paths[0].push(s);
            else if (s.start > _this.midPoint)
                paths[1].push(s);
            else
                _this.segments.push(s);
        });
        if (paths[0].length > 0) {
            this.left = new Node(paths[0]);
        }
        if (paths[1].length > 0) {
            this.right = new Node(paths[1]);
        }
    }
    /**
     * @description
     * Gets overlapping segments with the given segment.
     *
     * @param {Segment} s The segment to check for overlapping segments.
     * @returns {Array<Segment>} An array of overlapping segments.
     */
    Node.prototype.getOverlappingSegments = function (s) {
        if (this.midPoint < s.start) {
            // Overlapping segments in the right subtree and self
            var rightChild = this.right ? this.right.getOverlappingSegments(s) : [];
            var self = this.getDirectionalOverlappingSegments(s, interfaces_1.Direction.RIGHT);
            var result = __spreadArray(__spreadArray([], rightChild, true), self, true);
            return result.filter(function (n) { return !s.isEqual(n); });
        }
        else if (s.end < this.midPoint) {
            // Overlapping segments in the left subtree and self
            var leftChild = this.left ? this.left.getOverlappingSegments(s) : [];
            var self = this.getDirectionalOverlappingSegments(s, interfaces_1.Direction.LEFT);
            var result = __spreadArray(__spreadArray([], leftChild, true), self, true);
            return result.filter(function (n) { return !s.isEqual(n); });
        }
        else {
            // Overlapping segments in both subtrees and self
            var rightChild = this.right ? this.right.getOverlappingSegments(s) : [];
            var leftChild = this.left ? this.left.getOverlappingSegments(s) : [];
            var result = __spreadArray(__spreadArray(__spreadArray([], this.segments, true), rightChild, true), leftChild, true);
            return result.filter(function (n) { return !s.isEqual(n); });
        }
    };
    /**
     * @description
     * Gets overlapping segments in a specific direction relative to the given segment.
     *
     * @param {Segment} s The segment to check for overlapping segments.
     * @param {Direction} dir The direction (LEFT or RIGHT) to search for overlapping segments.
     * @returns {Array<Segment>} An array of overlapping segments in the specified direction.
     */
    Node.prototype.getDirectionalOverlappingSegments = function (s, dir) {
        return this.segments.filter(function (n) {
            switch (dir) {
                case interfaces_1.Direction.LEFT:
                    return n.start <= s.end;
                case interfaces_1.Direction.RIGHT:
                    return n.end >= s.start;
            }
        });
    };
    /**
     * @description
     * Calculates the midpoint of the given segments.
     *
     * @param {Array<Segment>} segments The segments to calculate the midpoint from.
     * @returns {number} The midpoint value.
     */
    Node.prototype.getMidPoint = function (segments) {
        var points = [-1, -1];
        segments.forEach(function (s) {
            if (points[0] === -1 || s.start < points[0]) {
                points[0] = s.start;
            }
            if (points[1] === -1 || s.end > points[1]) {
                points[1] = s.end;
            }
        });
        return Math.floor((points[0] + points[1]) / 2);
    };
    return Node;
}());
exports.Node = Node;
