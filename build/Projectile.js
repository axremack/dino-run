"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Projectile = (function (_super) {
    __extends(Projectile, _super);
    function Projectile(balise) {
        var _this = _super.call(this, balise) || this;
        _this.vx_ = 0;
        _this.vy_ = 0;
        _this.timerAnimation_ = 0;
        return _this;
    }
    Projectile.prototype.animer = function () {
        var _this = this;
        this.timerAnimation_ = setInterval(function () { _this.bouger(); }, 1000 / 120);
    };
    Projectile.prototype.figer = function () {
        if (this.timerAnimation_ != 0)
            clearInterval(this.timerAnimation_);
        this.timerAnimation_ = 0;
    };
    Projectile.prototype.bouger = function () {
        var x = this.getX() + this.vx_;
        var y = this.getY() + this.vy_;
        this.setXY(x, y);
    };
    return Projectile;
}(Sprite));
