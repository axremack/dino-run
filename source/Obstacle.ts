class Obstacle extends Sprite {
    //-------------------------------------------------------------------------------------Attributs
    public xmin_ : number;
    public xmax_ : number;
    public vx_ : number;
    public scene_ : Scene;
    public vie_ : number;
    private timerAnimation_ : number;

    //----------------------------------------------------------------------------------Constructeur
    public constructor(balise : HTMLElement, scene : Scene, vitesse : number, vie : number) {
        super(balise);
        this.xmin_=0;
        this.xmax_=0;
        this.vx_ = vitesse;
        this.vie_ = vie;
        this.scene_=scene;
        this.timerAnimation_ = 0;
    }

    //----------------------------------------------------------------------------------------animer
    public animer() {
        this.timerAnimation_ = setInterval( () => { this.bouger(); }, 1000/120 );
    }

    //-----------------------------------------------------------------------------------------figer
    public figer() {
        if (this.timerAnimation_ != 0) clearInterval(this.timerAnimation_);
        this.timerAnimation_ = 0;
    }

    //----------------------------------------------------------------------------------------bouger
    public bouger() {
        let x : number = this.getX() + this.vx_;
        this.setX(x);

        if(x<-20) {
            this.getParent().retirer(this);
            this.figer();
        }
        
        
        //Collision
        if(Sprite.collision(this.getRectangle(), this.scene_.perso_.getCercle())){
            this.scene_.perso_.vy_=-1*this.scene_.perso_.vy_;
            this.getParent().retirer(this);
            this.figer();
        }

        //Enlever vies
        let touche : boolean = false;
        for(let i :number=2; i>=0 && !touche; i--){
            if(this.scene_.tabVie_[i] != null && Sprite.collision(this.getRectangle(), this.scene_.perso_.getCercle())){
                this.scene_.retirer(this.scene_.tabVie_[i]);
                this.scene_.tabVie_[i]=null;
                this.vie_--;
                this.scene_.nbVie_ = this.vie_;
                touche=true;
                this.scene_.fin(this.vie_);
                console.log(this.vie_)
            }
        }
    }
}