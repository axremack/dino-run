/*class Palet extends Sprite{
    public actionSouris_ : any;
    public xmin_ : number;
    public xmax_ : number;
    
    public constructor(balise : HTMLElement){
        super(balise);
        this.actionSouris_=null;
        this.xmin_=0;
        this.xmax_=0;
    }
    
    public setLimites(zone : Sprite){
        this.xmin_=zone.getX();
        this.xmax_=zone.getX()+zone.getLargeur()-this.getLargeur();
    }

    public suivre(e : MouseEvent){
        let x : number = e.clientX-this.getParent().getX();
        if(x<this.xmin_){
            x=this.xmin_;
        }
        else if(x>this.xmax_){
            x=this.xmax_;
        }
        this.setX(x);
    }

    public animer(){
        this.actionSouris_ = (e:MouseEvent) => {this.suivre(e);};
        window.addEventListener("mousemove", this.actionSouris_);
    }

    public figer(){
        window.removeEventListener("mousemove", this.actionSouris_);
    }
}
*/