//==================================================================================================
// ANIMATION AVEC TYPESCRIPT                                                               Scene.ts
//==================================================================================================

// Classe  S c e n e //-----------------------------------------------------------------------------
class Scene extends Sprite {
 //----------------------------------------------------------------------------------------Attributs
 /* Declarer ici les attributs de la scene. */
 public actionClavier_ : any;
 public demarr_ : any;
 public redemarr_ : any;
 public perso_ : Perso;
 public sol_ : Sprite;
 public zone_ : Sprite;
 public obs_ : Array<Obstacle>;
 public obstacle_ : Obstacle;
 public generation_ : number;
 public compteur_ : number;
 public score_ : Sprite;
 public tabVie_ : Array<Sprite>;
 public nbVie_ : number;
 public vitesse_ : number;
 public fin_ : boolean;
 public compte_ : number; 


 //-------------------------------------------------------------------------------------Constructeur
 public constructor(balise : HTMLElement) {
  super(balise);
  this.setDimension(640,480);
  this.setX((window.innerWidth - this.getLargeur()) / 2);
  this.setY((window.innerHeight - this.getHauteur()) / 2);
 }

 //-----------------------------------------------------------------------------------------Démarrer
public demarrer() {
  //Ecran titre
  let demarr : Sprite = new Sprite(document.getElementById("demarr"));
  demarr.setXY(0,0);
  demarr.setDimension(this.getLargeur(),this.getHauteur());

  let decorDemarr : Sprite = new Sprite(document.createElement('img'));
  decorDemarr.setImage("fonddemarr.png", this.getLargeur(), this.getHauteur());
  decorDemarr.setXY(0, 0);
  demarr.ajouter(decorDemarr);

  let solDemarr : Sprite = new Sprite(document.createElement('img'));
  solDemarr.setImage("sol.jpg", this.getLargeur(), 70);
  solDemarr.setXY(0, (this.getHauteur()-solDemarr.getHauteur()));
  demarr.ajouter(solDemarr);

  let persoDemarr : Sprite = new Sprite(document.createElement('img'));
  persoDemarr.setImage("perso.png", 50, 50);
  persoDemarr.setXY(50,(this.getHauteur()-solDemarr.getHauteur()-persoDemarr.getHauteur()));
  demarr.ajouter(persoDemarr);

  //Lancement du jeu
  this.demarr_ = (e : KeyboardEvent) => {
    if (e.key == "Enter") {
      this.jeu();
      demarr.retirer(decorDemarr);
      demarr.retirer(solDemarr);
      demarr.retirer(persoDemarr);
    }
  }
  window.addEventListener('keydown', this.demarr_); 

}


//------------------------------------------------------------------------------------------Jeu 
public jeu(){
  this.fin_ = false;
  window.removeEventListener('keydown', this.demarr_);
  window.removeEventListener('keydown', this.redemarr_);

  //Zone
  this.zone_=new Sprite(document.getElementById("zone"));
  this.zone_.setXY(0,0);
  this.zone_.setDimension(this.getLargeur(),this.getHauteur());
  
  //Vitesse
  this.vitesse_=-4;
  setInterval(() => {if(this.vitesse_>(-9)){
                       this.vitesse_=1.1*this.vitesse_;
                    }}, 10000);
  
  // Décor
  let tabDecor : Array<Sprite>= new Array<Sprite>();
  
  for(let i:number=0;i<2;i++){
    let decor : Sprite = new Sprite(document.createElement('img'));
    decor.setImage("fond.png", this.zone_.getLargeur(), this.zone_.getHauteur());
    decor.setX(i*this.zone_.getLargeur());
    decor.setY(0);
    this.zone_.ajouter(decor);
    setInterval( () => {let vx : number = this.vitesse_;
                        let x : number = decor.getX() + vx;
                        decor.setX(x);
                        if (decor.getX()<=(-this.zone_.getLargeur())){
                          decor.setX(this.zone_.getLargeur());
                        } }, 1000/120 );
    }
  
  //Placer sol
  this.sol_ = new Sprite(document.createElement('img'));
  this.sol_.setImage('sol.jpg', this.zone_.getLargeur(), 70);
  this.zone_.ajouter(this.sol_);
  this.sol_.setXY(0, (this.zone_.getHauteur()-this.sol_.getHauteur()));
  
  
  // Personnage
  this.perso_ = new Perso (document.createElement('img'), this);
  this.perso_.setImage('perso.png', 50, 50);
  this.zone_.ajouter(this.perso_);
  this.perso_.setXY(50,(this.zone_.getHauteur()-this.sol_.getHauteur()-this.perso_.getHauteur()));
  this.perso_.animer();
  
  this.actionClavier_ = (e : KeyboardEvent) => {
    if (e.key == " ") this.perso_.sauter();
  }
  window.addEventListener('keydown', this.actionClavier_);
  
  
  //Placer obstacles
  this.generation_ = setTimeout(() => {this.obstacle();}, ((Math.random()+0.5)*2000));
  
  
  //Placer compteur
  this.score_ = new Sprite(document.getElementById("score"));
  this.ajouter(this.score_);
  this.score_.setDimension(40, 20);
  this.score_.setX(this.getLargeur()-this.score_.getLargeur());
  this.compteur_=0;
  this.compte_ = setInterval(() => {this.compteur_ ++;
                                    this.score_.getBalise().innerHTML=""+this.compteur_;}, 1000);
    
  // Placer vies
  this.tabVie_ = new Array<Sprite>();
  this.nbVie_ = 0;
  
  for(let i:number=0;i<3;i++){
    let vie : Sprite = new Sprite(document.createElement("img"));
    vie.setImage("vie.png",30, 30);
    vie.setX(i*30);
    vie.setY(0);
    this.ajouter(vie);
    this.tabVie_[this.nbVie_]=vie;
    this.nbVie_++;
  }
  console.log(this.nbVie_);

}


//------------------------------------------------------------------------------------------Plus de vies 
public fin(vie:number){
  if (vie==0){
    this.finJeu();
  }
}


//------------------------------------------------------------------------------------------Obstacles
public obstacle(){
  this.obs_ = new Array<Obstacle>();
  this.obstacle_ = new Obstacle (document.createElement("img"), this, this.vitesse_, this.nbVie_);
  this.obstacle_.setImage('sol.jpg', 10, Math.floor((Math.random()+0.8)*40));
  this.zone_.ajouter(this.obstacle_);
  this.obstacle_.setXY(((this.zone_.getLargeur()+20)),(this.zone_.getHauteur()-this.sol_.getHauteur()-this.obstacle_.getHauteur()));
  this.obstacle_.animer();
  if (this.fin_ == false){
    setTimeout(() => {this.obstacle();}, ((Math.random()+0.5)*2000));
  }
}


//------------------------------------------------------------------------------------------Fin du jeu
 public finJeu(){
  this.fin_ = true;

  /*let fin : Sprite = new Sprite(document.getElementById("fin"));
  fin.setXY(0,0);
  fin.setDimension(this.getLargeur(),this.getHauteur());
 
  let decorFin : Sprite = new Sprite(document.createElement('img'));
  decorFin.setImage("fondfin.png", this.getLargeur(), this.getHauteur());
  decorFin.setXY(0, 0);
  fin.ajouter(decorFin);
 
  let solFin : Sprite = new Sprite(document.createElement('img'));
  solFin.setImage("sol.jpg", this.getLargeur(), 70);
  solFin.setXY(0, (this.getHauteur()-solFin.getHauteur()));
  fin.ajouter(solFin);
 
  let persoFin : Sprite = new Sprite(document.createElement('img'));
  persoFin.setImage("perso.png", 50, 50);
  persoFin.setXY(50,(this.getHauteur()-solFin.getHauteur()-persoFin.getHauteur()));
  fin.ajouter(persoFin);

  this.redemarr_ = (e : KeyboardEvent) => {
    if (e.key == "Enter") {
      this.jeu();
      fin.retirer(decorFin);
      fin.retirer(solFin);
      fin.retirer(persoFin);
    }
  }
  window.addEventListener('keydown', this.redemarr_);*/
    
  // Supprimer Personnage
  this.perso_.figer();
  this.obstacle_.figer();


  //Supprimer les restes du jeu
  window.removeEventListener('keydown', this.actionClavier_);
      
  clearInterval(this.compte_);
     
  this.score_.setDimension(100, 20);
  this.score_.setX((this.getLargeur()/2)-(this.score_.getLargeur()/2));
  this.score_.setY(150);

}



 //------------------------------------------------------------------------------------------arreter
 public arreter() {
  /* Ecrire ici le code qui termine la scene. */
 }
}

// Fin //-------------------------------------------------------------------------------------------
