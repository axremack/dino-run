/*class Balle extends Sprite{
    public xmin_ : number;
    public xmax_ : number;
    public ymax_ : number;
    public ymin_ : number;
    public vx_ : number;
    public vy_ : number;
    public timer_ : number;
    public scene_ : Scene;

    public constructor(balise : HTMLElement, scene : Scene){
        super (balise);
        this.xmin_=0;
        this.xmax_=0;
        this.ymin_=0;
        this.ymax_=0;
        this.vx_=0;
        this.vy_=0;
        this.timer_=0;
        this.scene_=scene;
    }

    public setLimites(zone : Sprite){
        this.xmin_=zone.getX();
        this.xmax_=zone.getX()+zone.getLargeur()-this.getLargeur();
        this.ymin_=zone.getY();
        this.ymax_=zone.getY()+zone.getHauteur()-this.getHauteur();
    }

    public bouger(){
        let x : number = this.getX()+this.vx_;
        let y : number = this.getY()+this.vy_;
        
        if(y<this.ymin_){
            y=this.ymin_;
            this.vy_=-1*this.vy_;
        }
        else if(x<this.xmin_){
            x=this.xmin_;
            this.vx_=-1*this.vx_;
        }
        else if(x>this.xmax_){
            x=this.xmax_;
            this.vx_=-1*this.vx_;
        }
        else if(y>this.ymax_){
            y=this.ymax_;
            this.vy_=-1*this.vy_;
        }
        
       if(Sprite.collision(this.getCercle(), this.scene_.palet_.getRectangle())){
            y=this.scene_.palet_.getY()-this.getHauteur();
            this.vy_=-1*this.vy_;
            let v : number = Math.sqrt(this.vx_*this.vx_+this.vy_*this.vy_);
            if(v<8){
                this.vx_=1.1*this.vx_;
                this.vy_=1.1*this.vy_;
            }
        }

        let briques_:Array<Sprite>=this.scene_.briques_;
        let touche:boolean=false;
        for(let i : number=0; i<briques_.length && !touche; i++){
            if (briques_[i] !=null && Sprite.collision(this.getCercle(), briques_[i].getRectangle())){
                this.scene_.retirer(briques_[i]);
                this.vy_=-1*this.vy_;
                briques_[i]=null;
                touche = true;
            }
        }

        this.setXY(x,y);
    }

    public animer(){
        this.timer_ = setInterval( () => {this.bouger();}, 1000/120);
    }

    public figer(){
        clearInterval(this.timer_);
    }
}
*/