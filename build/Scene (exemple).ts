/*
//==================================================================================================
// ANIMATION AVEC TYPESCRIPT                                                               Scene.ts
//==================================================================================================

// Classe  S c e n e //-----------------------------------------------------------------------------
class Scene extends Sprite {
 //----------------------------------------------------------------------------------------Attributs
public lab_ : Array <Array <number>>;
public x0_ : number;
public y0_ : number;
public pas_ : number;
public perso_ : Perso;
public actionClavier_ : any;

 //-------------------------------------------------------------------------------------Constructeur
 public constructor(balise : HTMLElement) {
  super(balise);
  this.setDimension(640,480);
  this.setX((window.innerWidth - this.getLargeur()) / 2);
  this.setY((window.innerHeight - this.getHauteur()) / 2);
 }

 //-----------------------------------------------------------------------------------------demarrer
 public demarrer() {
     this.lab_=new Array <Array<number>>();
     this.lab_[0]=new Array <number> (1,1,1,1,1);
     this.lab_[1]=new Array <number> (1,0,0,0,1);
     this.lab_[2]=new Array <number> (1,0,1,0,9);
     this.lab_[3]=new Array <number> (1,8,1,0,1);
     this.lab_[4]=new Array <number> (1,1,1,1,1);
     this.x0_= 0;
     this.y0_= 0;
     this.pas_= 50;

     for(let i:number=0;i<this.lab_.length;i++){
         for(let j:number=0; j<this.lab_[i].length; j++){
            if(this.lab_[i][j] == 1){
                let mur :  Sprite = new Sprite(document.createElement('img'));
                mur.setImage('mur.png', this.pas_, this.pas_);
                mur.setX(this.x0_+(j*this.pas_));
                mur.setY(this.y0_+(i*this.pas_));
                this.ajouter(mur);
            }
            else if (this.lab_[i][j] == 8){
                this.perso_ = new Perso (document.createElement('img'), this, i, j);
                this.perso_.setImage('perso.png', this.pas_, this.pas_);
                this.perso_.setX(this.x0_+(j*this.pas_));
                this.perso_.setY(this.y0_+(i*this.pas_));
                this.ajouter(this.perso_);
            }
        }
     }
     
     this.actionClavier_= (e : KeyboardEvent) => {
         if (e.key == "ArrowLeft") this.perso_.gauche();
         else if (e.key == "ArrowRight") this.perso_.droite();
         else if (e.key == "ArrowUp") this.perso_.haut();
         else if (e.key == "ArrowDown") this.perso_.bas();
     }
     window.addEventListener('keydown', this.actionClavier_);

 }

 //------------------------------------------------------------------------------------------arreter
 public arreter() {
  // Ecrire ici le code qui termine la scene.
 }
}

// Fin //-------------------------------------------------------------------------------------------
*/