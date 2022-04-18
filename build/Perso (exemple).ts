/*class Perso extends Sprite{
    public col_ : number;
    public ligne_ : number;
    public scene_ : Scene;

    public constructor (balise : HTMLElement, scene : Scene, l : number, c : number){
        super(balise);
        this.col_=c;
        this.ligne_=l;
        this.scene_=scene;
        this.setXY(0,0);
    }

    public gauche (){
        if(this.scene_.lab_[this.ligne_][this.col_-1] != 1){
            this.col_=this.col_-1;
            this.setX(this.getX()-this.scene_.pas_);
            this.setRotation(180);
        }
    }

    public droite (){
        if(this.scene_.lab_[this.ligne_][this.col_+1] != 1){
            this.col_=this.col_+1;
            this.setX(this.getX()+this.scene_.pas_);
            this.setRotation(0);
        }
    }

    public haut (){
        if(this.scene_.lab_[this.ligne_-1][this.col_] != 1){
            this.ligne_=this.ligne_-1;
            this.setY(this.getY()-this.scene_.pas_);
            this.setRotation(-90);
        }
    }

    public bas (){
        if(this.scene_.lab_[this.ligne_+1][this.col_] != 1){
            this.ligne_=this.ligne_+1;
            this.setY(this.getY()+this.scene_.pas_);
            this.setRotation(90);
        }
    }
}

*/