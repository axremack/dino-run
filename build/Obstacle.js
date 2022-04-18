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
var Obstacle = (function (_super) {
    __extends(Obstacle, _super);
    function Obstacle(balise, scene, vitesse, vie) {
        var _this = _super.call(this, balise) || this;
        _this.xmin_ = 0;
        _this.xmax_ = 0;
        _this.vx_ = vitesse;
        _this.vie_ = vie;
        _this.scene_ = scene;
        _this.timerAnimation_ = 0;
        return _this;
    }
    Obstacle.prototype.animer = function () {
        var _this = this;
        this.timerAnimation_ = setInterval(function () { _this.bouger(); }, 1000 / 120);
    };
    Obstacle.prototype.figer = function () {
        if (this.timerAnimation_ != 0)
            clearInterval(this.timerAnimation_);
        this.timerAnimation_ = 0;
    };
    Obstacle.prototype.bouger = function () {
        var x = this.getX() + this.vx_;
        this.setX(x);
        if (x < -20) {
            this.getParent().retirer(this);
            this.figer();
        }
        if (Sprite.collision(this.getRectangle(), this.scene_.perso_.getCercle())) {
            this.scene_.perso_.vy_ = -1 * this.scene_.perso_.vy_;
            this.getParent().retirer(this);
            this.figer();
        }
        var touche = false;
        for (var i = 2; i >= 0 && !touche; i--) {
            if (this.scene_.tabVie_[i] != null && Sprite.collision(this.getRectangle(), this.scene_.perso_.getCercle())) {
                this.scene_.retirer(this.scene_.tabVie_[i]);
                this.scene_.tabVie_[i] = null;
                this.vie_--;
                this.scene_.nbVie_ = this.vie_;
                touche = true;
                this.scene_.fin(this.vie_);
                console.log(this.vie_);
            }
        }
    };
    return Obstacle;
}(Sprite));
