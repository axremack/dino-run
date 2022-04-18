class Perso extends Sprite{
    public scene_ : Scene;
    public vy_ : number;
    private timerAnimation_ : number;

    public constructor (balise:HTMLElement, scene:Scene){
        super(balise);
        this.scene_=scene;
        this.vy_ = 0;
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
        let y : number = this.getY() + this.vy_;
        this.setY(y);

        this.vy_+=0.1;
        
        if (y>(this.scene_.zone_.getHauteur()-this.scene_.sol_.getHauteur()-this.scene_.perso_.getHauteur())){
            this.vy_=0;
        }
    }


    public sauter(){
        if(this.vy_==0){
            let y : number = this.scene_.zone_.getHauteur()-this.scene_.sol_.getHauteur()-this.scene_.perso_.getHauteur();
            this.vy_=-5;
        }
    }

    public toucher(){
        this.masquer();
        setInterval(() => {this.montrer();}, 200)
    }

    
}
