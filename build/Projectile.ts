// Classe  P r o j e c t i l e //-------------------------------------------------------------------
class Projectile extends Sprite {
    //-------------------------------------------------------------------------------------Attributs
    public vx_ : number;
    public vy_ : number;

    private timerAnimation_ : number;

    //----------------------------------------------------------------------------------Constructeur
    public constructor(balise : HTMLElement) {
        super(balise);

        this.vx_ = 0;
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
        let x : number = this.getX() + this.vx_;
        let y : number = this.getY() + this.vy_;

        this.setXY(x,y);
    }
}
