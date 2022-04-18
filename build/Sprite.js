"use strict";
var Sprite = (function () {
    function Sprite(balise) {
        this.balise_ = balise;
        this.parent_ = null;
        this.enfants_ = new Array();
        try {
            var rectangle = balise.getBoundingClientRect();
            this.x_ = rectangle.left;
            this.y_ = rectangle.right;
            this.largeur_ = rectangle.width;
            this.hauteur_ = rectangle.height;
        }
        catch (e) {
            this.x_ = 0;
            this.y_ = 0;
            this.largeur_ = 0;
            this.hauteur_ = 0;
        }
        this.setRotation(0);
        this.setOpacite(1);
        this.balise_.style.position = "absolute";
    }
    Sprite.prototype.getBalise = function () { return this.balise_; };
    Sprite.prototype.setBalise = function (balise) { this.balise_ = balise; };
    Sprite.prototype.getParent = function () { return this.parent_; };
    Sprite.prototype.getEnfants = function () { return this.enfants_; };
    Sprite.prototype.ajouter = function (sprite) {
        if (sprite instanceof Sprite) {
            this.getBalise().appendChild(sprite.getBalise());
            sprite.parent_ = this;
            this.enfants_.push(sprite);
        }
        else if (sprite instanceof HTMLElement)
            this.getBalise().appendChild(sprite);
    };
    Sprite.prototype.retirer = function (sprite) {
        if (sprite instanceof Sprite) {
            this.getBalise().removeChild(sprite.getBalise());
            sprite.parent_ = null;
            for (var i = 0; i < this.enfants_.length; ++i) {
                if (this.enfants_[i] == sprite) {
                    var dernier = this.enfants_.pop();
                    if (i < this.enfants_.length)
                        this.enfants_[i] = dernier;
                    i = this.enfants_.length;
                }
            }
        }
        else if (sprite instanceof HTMLElement)
            this.getBalise().removeChild(sprite);
    };
    Sprite.prototype.getX = function () { return this.x_; };
    Sprite.prototype.getY = function () { return this.y_; };
    Sprite.prototype.setX = function (x) {
        this.balise_.style.left = x + "px";
        this.x_ = x;
    };
    Sprite.prototype.setY = function (y) {
        this.balise_.style.top = y + "px";
        this.y_ = y;
    };
    Sprite.prototype.setXY = function (x, y) {
        this.balise_.style.left = x + "px";
        this.balise_.style.top = y + "px";
        this.x_ = x;
        this.y_ = y;
    };
    Sprite.prototype.getLargeur = function () { return this.largeur_; };
    Sprite.prototype.getHauteur = function () { return this.hauteur_; };
    Sprite.prototype.setLargeur = function (largeur) {
        this.balise_.style.width = largeur + "px";
        this.largeur_ = largeur;
        if (this.balise_ instanceof HTMLCanvasElement)
            (this.balise_).width = largeur;
    };
    Sprite.prototype.setHauteur = function (hauteur) {
        this.balise_.style.height = hauteur + "px";
        this.hauteur_ = hauteur;
        if (this.balise_ instanceof HTMLCanvasElement)
            (this.balise_).height = hauteur;
    };
    Sprite.prototype.setDimension = function (largeur, hauteur) {
        this.balise_.style.width = largeur + "px";
        this.balise_.style.height = hauteur + "px";
        this.largeur_ = largeur;
        this.hauteur_ = hauteur;
        if (this.balise_ instanceof HTMLCanvasElement) {
            (this.balise_).width = largeur;
            (this.balise_).height = hauteur;
        }
    };
    Sprite.prototype.getCentreX = function () { return (this.x_ + this.largeur_ / 2); };
    Sprite.prototype.getCentreY = function () { return (this.y_ + this.hauteur_ / 2); };
    Sprite.prototype.getGauche = function () { return this.x_; };
    Sprite.prototype.getDroit = function () { return (this.x_ + this.largeur_); };
    Sprite.prototype.getHaut = function () { return this.y_; };
    Sprite.prototype.getBas = function () { return (this.y_ + this.hauteur_); };
    Sprite.prototype.getPoint = function () {
        return new Sprite.Point(this.x_ + this.largeur_ / 2, this.y_ + this.hauteur_ / 2);
    };
    Sprite.prototype.getRectangle = function () {
        return new Sprite.Rectangle(this.x_, this.y_, this.largeur_, this.hauteur_);
    };
    Sprite.prototype.getCercle = function (ratio) {
        if (ratio === void 0) { ratio = 1; }
        return new Sprite.Cercle(this.x_ + this.largeur_ / 2, this.y_ + this.hauteur_ / 2, ratio * this.largeur_ / 2);
    };
    Sprite.prototype.setImage = function (url, largeur, hauteur) {
        if (this.balise_ instanceof HTMLImageElement) {
            this.balise_.src = url;
            this.setLargeur(largeur);
            this.setHauteur(hauteur);
        }
    };
    Sprite.prototype.getPinceau = function () {
        if (this.getBalise() instanceof HTMLCanvasElement)
            return (this.getBalise()).getContext("2d");
        return null;
    };
    Sprite.prototype.masquer = function () { this.balise_.style.display = "none"; };
    Sprite.prototype.montrer = function () { if (!this.estVisible())
        this.balise_.style.display = "block"; };
    Sprite.prototype.estVisible = function () { return (this.balise_.style.display != "none"); };
    Sprite.prototype.getRotation = function () { return this.rotation_; };
    Sprite.prototype.setRotation = function (angle) {
        this.rotation_ = angle;
        this.balise_.style.transform = "rotate(" + angle + "deg)";
    };
    Sprite.prototype.setPivotRotation = function (x, y) {
        this.balise_.style.transformOrigin = x + "px " + y + "px";
    };
    Sprite.prototype.getOpacite = function () { return this.opacite_; };
    Sprite.prototype.setOpacite = function (coef) {
        this.opacite_ = coef;
        this.balise_.style.opacity = "" + this.opacite_;
    };
    Sprite.prototype.addEventListener = function (type, action) {
        this.balise_.addEventListener(type, action);
    };
    Sprite.prototype.removeEventListener = function (type, action) {
        this.balise_.removeEventListener(type, action);
    };
    return Sprite;
}());
(function (Sprite) {
    function collision(a, b) {
        if (a instanceof Cercle) {
            if (b instanceof Cercle)
                return collisionCercleCercle(a, b);
            else if (b instanceof Rectangle)
                return collisionCercleRectangle(a, b);
            else if (b instanceof Point)
                return collisionCerclePoint(a, b);
        }
        else if (a instanceof Rectangle) {
            if (b instanceof Cercle)
                return collisionCercleRectangle(b, a);
            else if (b instanceof Rectangle)
                return collisionRectangleRectangle(a, b);
            else if (b instanceof Point)
                return collisionRectanglePoint(a, b);
        }
        else if (a instanceof Point) {
            if (b instanceof Cercle)
                return collisionCerclePoint(b, a);
            else if (b instanceof Rectangle)
                return collisionRectanglePoint(b, a);
            else if (b instanceof Point)
                return collisionPointPoint(a, b);
        }
    }
    Sprite.collision = collision;
    var Point = (function () {
        function Point(x, y) {
            this.x_ = x;
            this.y_ = y;
        }
        return Point;
    }());
    Sprite.Point = Point;
    var Cercle = (function () {
        function Cercle(cx, cy, rayon) {
            this.cx_ = cx;
            this.cy_ = cy;
            this.rayon_ = rayon;
        }
        return Cercle;
    }());
    Sprite.Cercle = Cercle;
    var Rectangle = (function () {
        function Rectangle(x, y, largeur, hauteur) {
            this.x_ = x;
            this.y_ = y;
            this.largeur_ = largeur;
            this.hauteur_ = hauteur;
        }
        return Rectangle;
    }());
    Sprite.Rectangle = Rectangle;
    function collisionCercleRectangle(cercle, rectangle) {
        var px = Math.max(rectangle.x_, Math.min(cercle.cx_, rectangle.x_ + rectangle.largeur_));
        var py = Math.max(rectangle.y_, Math.min(cercle.cy_, rectangle.y_ + rectangle.hauteur_));
        var dx = px - cercle.cx_;
        var dy = py - cercle.cy_;
        var distance = dx * dx + dy * dy;
        var rayon = cercle.rayon_ * cercle.rayon_;
        return (distance < rayon);
    }
    function collisionCercleCercle(cercle1, cercle2) {
        var dx = cercle1.cx_ - cercle2.cx_;
        var dy = cercle1.cy_ - cercle2.cy_;
        var distance = dx * dx + dy * dy;
        var rayon = cercle1.rayon_ + cercle2.rayon_;
        return (distance < rayon * rayon);
    }
    function collisionCerclePoint(cercle, point) {
        var dx = point.x_ - cercle.cx_;
        var dy = point.y_ - cercle.cy_;
        var distance = dx * dx + dy * dy;
        var rayon = cercle.rayon_ * cercle.rayon_;
        return (distance < rayon);
    }
    function collisionRectangleRectangle(rectangle1, rectangle2) {
        return (rectangle1.x_ < rectangle2.x_ + rectangle2.largeur_
            && rectangle1.x_ + rectangle1.largeur_ > rectangle2.x_
            && rectangle1.y_ < rectangle2.y_ + rectangle2.hauteur_
            && rectangle1.y_ + rectangle1.hauteur_ > rectangle2.y_);
    }
    function collisionRectanglePoint(rectangle, point) {
        return (point.x_ >= rectangle.x_ && point.x_ <= rectangle.x_ + rectangle.largeur_
            && point.y_ >= rectangle.y_ && point.y_ <= rectangle.y_ + rectangle.hauteur_);
    }
    function collisionPointPoint(point1, point2) {
        var dx = point1.x_ - point2.x_;
        var dy = point1.y_ - point2.y_;
        var distance = dx * dx + dy * dy;
        return (distance < 1);
    }
})(Sprite || (Sprite = {}));
