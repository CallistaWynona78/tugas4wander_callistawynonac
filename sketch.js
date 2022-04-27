//callistawynonac
//119160078
let vs =[]
function setup() {
  createCanvas(400,450);
  v = new Vehicle(200,200);
}

function draw() {
  background(115,255,216);
  
  v.display()
  v.edges()
  v.update();
  v.wander();
}

class Vehicle {
  constructor(x,y){
    this.location=createVector(x,y);
    this.velocity=createVector(1,0);
    this.acceleration=createVector(0,0);
    this.l=30.0;
    this.maxspeed=2;
    this.maxforce=0.1;
    this.wanderTheta=PI/2;
  }
  wander(){
    //let steering_force =p5.Vector.random2D()
    //steering_force.setMag(0.6 )
    //this.applyForce(steering_force)
    let projVector=this.velocity.copy();
    projVector.setMag(100);
    let projPoint=projVector.add(this.location);
    
    let wanderRadius=100;
    let theta=this.wanderTheta+this.velocity.heading();
    
    let xBar=wanderRadius*cos(theta);
    let yBar=wanderRadius*cos(theta);
    
    let wanderPoint=p5.Vector.add(projPoint, createVector(xBar, yBar));
    
    let debug =true;
    if(debug){
      push()
      line(this.location.x, this.location.y, projPoint.x, projPoint.y);
      noStroke()
      fill('green');
      circle(projPoint.x, projPoint.y, 10);
      noFill();
      stroke('black');
      circle(projPoint.x, projPoint.y, this.wanderRadius*1);
      
      line(this.location.x, this.location.y, wanderPoint.x, wanderPoint.y);
      fill('blue');
      circle(wanderPoint.x, wanderPoint.y, 15)
      pop()
    }
    
    let steeringForce=wanderPoint.sub(this.location);
    steeringForce.setMag(this.maxforce);
    this.applyForce(steeringForce);
    
    this.wanderTheta+= random(-0.5,0.5 );
    //this.wanderTheta=this.wanderTheta+random(-0.5,0.5);
    
  }
  
  seek(vektorTarget){
    //mengetahui target lokasi
    var desired=p5.Vector.sub(vektorTarget, this.location);
    desired.normalize();
    desired.mult(this.maxspeed);
    
    //kemudi
    var steer=p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxforce);
    this.applyForce(steer);
  }
  
  arrive(vektorTarget){
    //mengetahui target lokasi
    var desired=p5.Vector.sub(vektorTarget,this.location);
    var jarak=desired()
    
    if(jarak<100){
      var m=map(jarak,0,100,0,this.maxspeed);
      desired.normalize();
      desired.mult(m);
      
    }
    else{
      desired.normalize();
      desired.mult(this.maxspeed);
    }
    
    //kemudi
    var steer = p5.Vector.sub(desired,this.velocity);
    steer.limit(this.maxforce);
    this.applyForce(steer);
  }
  
  update(){
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxspeed);
    this.location.add(this.velocity);
    this.acceleration.mult(0);
  }
  applyForce(force){
    this.acceleration.add(force);
  }
  display(){
    var theta=this.velocity.heading()//+PI/2;
    push();
    fill(251,235,217);
    stroke(0);
    translate(this.location.x,this.location.y)
    rotate(theta)
    ellipse(15,50,100,100);
    fill('red');
    ellipse(80,50,100,200);
    fill('white')
    ellipse(45,40,35,60);
    fill('white')
    ellipse(75,105,55,40);
    fill('white')
    ellipse(80,-30,35,30);
    fill('white')
    ellipse(112,40,35,60);
    fill('yellow')
    triangle(-2,30,1,5,25,20)
    pop();
  }
  
  edges(){
    if (this.location.x>width+10){
      this.location.x=-10;
    } else if(this.location.x<-10){
      this.location.x=width+10;
    }
    if(this.location.y>height+10){
      this.location.y=-10;
    } else if (this.location.y<-10){
      this.location.y=height+10;
    }
    }
}
