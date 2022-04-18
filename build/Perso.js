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
var Perso = (function (_super) {
    __extends(Perso, _super);
    function Perso(balise, scene) {
        var _this = _super.call(this, balise) || this;
        _this.scene_ = scene;
        _this.vy_ = 0;
        _this.timerAnimation_ = 0;
        return _this;
    }
    Perso.prototype.animer = function () {
        var _this = this;
        this.timerAnimation_ = setInterval(function () { _this.bouger(); }, 1000 / 120);
    };
    Perso.prototype.figer = function () {
        if (this.timerAnimation_ != 0)
            clearInterval(this.timerAnimation_);
        this.timerAnimation_ = 0;
    };
    Perso.prototype.bouger = function () {
        var y = this.getY() + this.vy_;
        this.setY(y);
        this.vy_ += 0.1;
        if (y > (this.scene_.zone_.getHauteur() - this.scene_.sol_.getHauteur() - this.scene_.perso_.getHauteur())) {
            this.vy_ = 0;
        }
    };
    Perso.prototype.sauter = function () {
        if (this.vy_ == 0) {
            var y = this.scene_.zone_.getHauteur() - this.scene_.sol_.getHauteur() - this.scene_.perso_.getHauteur();
            this.vy_ = -5;
        }
    };
    Perso.prototype.toucher = function () {
        var _this = this;
        this.masquer();
        setInterval(function () { _this.montrer(); }, 200);
    };
    return Perso;
}(Sprite));
