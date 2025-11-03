"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Match = void 0;
var segment_1 = require("./segment");
/**
 * @class Match
 * @classdesc A match result for a given string corresponding to a segment within a `Trie`.
 * @extends Segment
 */
var Match = /** @class */ (function (_super) {
    __extends(Match, _super);
    function Match(start, end, keyword) {
        var _this = _super.call(this, start, end) || this;
        _this.start = start;
        _this.end = end;
        _this.keyword = keyword;
        return _this;
    }
    return Match;
}(segment_1.Segment));
exports.Match = Match;
