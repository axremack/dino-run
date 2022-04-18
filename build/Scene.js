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
var Scene = (function (_super) {
    __extends(Scene, _super);
    function Scene(balise) {
        var _this = _super.call(this, balise) || this;
        _this.setDimension(640, 480);
        _this.setX((window.innerWidth - _this.getLargeur()) / 2);
        _this.setY((window.innerHeight - _this.getHauteur()) / 2);
        return _this;
    }
    Scene.prototype.demarrer = function () {
        var _this = this;
        var demarr = new Sprite(document.getElementById("demarr"));
        demarr.setXY(0, 0);
        demarr.setDimension(this.getLargeur(), this.getHauteur());
        var decorDemarr = new Sprite(document.createElement('img'));
        decorDemarr.setImage("fonddemarr.png", this.getLargeur(), this.getHauteur());
        decorDemarr.setXY(0, 0);
        demarr.ajouter(decorDemarr);
        var solDemarr = new Sprite(document.createElement('img'));
        solDemarr.setImage("sol.jpg", this.getLargeur(), 70);
        solDemarr.setXY(0, (this.getHauteur() - solDemarr.getHauteur()));
        demarr.ajouter(solDemarr);
        var persoDemarr = new Sprite(document.createElement('img'));
        persoDemarr.setImage("perso.png", 50, 50);
        persoDemarr.setXY(50, (this.getHauteur() - solDemarr.getHauteur() - persoDemarr.getHauteur()));
        demarr.ajouter(persoDemarr);
        this.demarr_ = function (e) {
            if (e.key == "Enter") {
                _this.jeu();
                demarr.retirer(decorDemarr);
                demarr.retirer(solDemarr);
                demarr.retirer(persoDemarr);
            }
        };
        window.addEventListener('keydown', this.demarr_);
    };
    Scene.prototype.jeu = function () {
        var _this = this;
        this.fin_ = false;
        window.removeEventListener('keydown', this.demarr_);
        window.removeEventListener('keydown', this.redemarr_);
        this.zone_ = new Sprite(document.getElementById("zone"));
        this.zone_.setXY(0, 0);
        this.zone_.setDimension(this.getLargeur(), this.getHauteur());
        this.vitesse_ = -4;
        setInterval(function () {
            if (_this.vitesse_ > (-9)) {
                _this.vitesse_ = 1.1 * _this.vitesse_;
            }
        }, 10000);
        var tabDecor = new Array();
        var _loop_1 = function (i) {
            var decor = new Sprite(document.createElement('img'));
            decor.setImage("fond.png", this_1.zone_.getLargeur(), this_1.zone_.getHauteur());
            decor.setX(i * this_1.zone_.getLargeur());
            decor.setY(0);
            this_1.zone_.ajouter(decor);
            setInterval(function () {
                var vx = _this.vitesse_;
                var x = decor.getX() + vx;
                decor.setX(x);
                if (decor.getX() <= (-_this.zone_.getLargeur())) {
                    decor.setX(_this.zone_.getLargeur());
                }
            }, 1000 / 120);
        };
        var this_1 = this;
        for (var i = 0; i < 2; i++) {
            _loop_1(i);
        }
        this.sol_ = new Sprite(document.createElement('img'));
        this.sol_.setImage('sol.jpg', this.zone_.getLargeur(), 70);
        this.zone_.ajouter(this.sol_);
        this.sol_.setXY(0, (this.zone_.getHauteur() - this.sol_.getHauteur()));
        this.perso_ = new Perso(document.createElement('img'), this);
        this.perso_.setImage('perso.png', 50, 50);
        this.zone_.ajouter(this.perso_);
        this.perso_.setXY(50, (this.zone_.getHauteur() - this.sol_.getHauteur() - this.perso_.getHauteur()));
        this.perso_.animer();
        this.actionClavier_ = function (e) {
            if (e.key == " ")
                _this.perso_.sauter();
        };
        window.addEventListener('keydown', this.actionClavier_);
        this.generation_ = setTimeout(function () { _this.obstacle(); }, ((Math.random() + 0.5) * 2000));
        this.score_ = new Sprite(document.getElementById("score"));
        this.ajouter(this.score_);
        this.score_.setDimension(40, 20);
        this.score_.setX(this.getLargeur() - this.score_.getLargeur());
        this.compteur_ = 0;
        this.compte_ = setInterval(function () {
            _this.compteur_++;
            _this.score_.getBalise().innerHTML = "" + _this.compteur_;
        }, 1000);
        this.tabVie_ = new Array();
        this.nbVie_ = 0;
        for (var i = 0; i < 3; i++) {
            var vie = new Sprite(document.createElement("img"));
            vie.setImage("vie.png", 30, 30);
            vie.setX(i * 30);
            vie.setY(0);
            this.ajouter(vie);
            this.tabVie_[this.nbVie_] = vie;
            this.nbVie_++;
        }
        console.log(this.nbVie_);
    };
    Scene.prototype.fin = function (vie) {
        if (vie == 0) {
            this.finJeu();
        }
    };
    Scene.prototype.obstacle = function () {
        var _this = this;
        this.obs_ = new Array();
        this.obstacle_ = new Obstacle(document.createElement("img"), this, this.vitesse_, this.nbVie_);
        this.obstacle_.setImage('sol.jpg', 10, Math.floor((Math.random() + 0.8) * 40));
        this.zone_.ajouter(this.obstacle_);
        this.obstacle_.setXY(((this.zone_.getLargeur() + 20)), (this.zone_.getHauteur() - this.sol_.getHauteur() - this.obstacle_.getHauteur()));
        this.obstacle_.animer();
        if (this.fin_ == false) {
            setTimeout(function () { _this.obstacle(); }, ((Math.random() + 0.5) * 2000));
        }
    };
    Scene.prototype.finJeu = function () {
        this.fin_ = true;
        this.perso_.figer();
        this.obstacle_.figer();
        window.removeEventListener('keydown', this.actionClavier_);
        clearInterval(this.compte_);
        this.score_.setDimension(100, 20);
        this.score_.setX((this.getLargeur() / 2) - (this.score_.getLargeur() / 2));
        this.score_.setY(150);
    };
    Scene.prototype.arreter = function () {
    };
    return Scene;
}(Sprite));
