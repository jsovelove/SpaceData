
let astroData;

function preload() {
    myFont = loadFont('JetBrainsMono-Bold.ttf');
    astroData = loadJSON('astros.json');
}


var w = window.innerWidth
var h = window.innerHeight

var w2 = window.innerWidth / 2
var h2 = window.innerHeight / 2

let s = 1;
let r = 40



const controls = {
    view: {x: 500, y: 95, zoom: 0.6},
    viewPos: { prevX: null,  prevY: null,  isDragging: false },
  }


function setup() {
    let canvas = createCanvas(w, h);
    canvas.mouseWheel(e => Controls.zoom(controls).worldZoom(e))
}

function draw() {  
    translate(controls.view.x, controls.view.y);
    scale(controls.view.zoom)
    var astroNum = astroData.number

    background(45,45,51);
    noFill();
    stroke("#4F4F59");
    circle(w / 2, h / 2, r);
    circle(w / 2, h / 2, r * 2);
    circle(w / 2, h / 2, r * 3);
    circle(w / 2, h / 2, r * 4);
    push();
    strokeWeight(5);
    circle(w / 2, h / 2, r * 5);
    pop()
    circle(w / 2, h / 2, r * 6);
    circle(w / 2, h / 2, r * 7);
    circle(w / 2, h / 2, r * 8);
    circle(w / 2, h / 2, r * 9);
    push();
    strokeWeight(5);
    circle(w / 2, h / 2, r * 10);
    pop();
    circle(w / 2, h / 2, r * 11);
    circle(w / 2, h / 2, r * 12);
    circle(w / 2, h / 2, r * 13);
    circle(w / 2, h / 2, r * 14);
    push();
    strokeWeight(5);
    circle(w / 2, h / 2, r * 15);
    pop();
    circle(w / 2, h / 2, r * 16);
    circle(w / 2, h / 2, r * 17);
    circle(w / 2, h / 2, r * 18);
    circle(w / 2, h / 2, r * 19);
    push();
    strokeWeight(5);
    circle(w / 2, h / 2, r * 20);
    pop();

    stroke("#B7B7BC")
    fill("#B7B7BC")
    textSize(70)
    text( 'There are currently \n' + astroNum + ' humans in space', -600, h2)
    textSize(20)
    text('This data was sourced from the people in space API \nand whoisinspace.com', -600, h2 + 150)

    translate(width/2, height/2);
    textSize(10);

    let numLines = astroNum;
    let angleStep = 360 / numLines;

    push();
    textSize(20)
    text('days spent in space', -90, -450)
    pop();

    for (let i = 0; i < numLines; i++) {
      let angle = i * angleStep + 10;

      let lineLen = astroData.people[i].days_in_space;

      push();
      rotate(angle);
      line(0, 0, lineLen, 0);
      translate(lineLen, 0);
      rotate(-angle);
      textAlign(CENTER, CENTER);
      text(astroData.people[i].name, 10, 10);
      textSize(8);
      text('Craft: ' + astroData.people[i].craft + ' days: ' + lineLen, 10, 25)
      ellipse(0, 0, 6, 6);
      pop();

      
    }

    

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  location.reload();

}

function ISS () {
    $.getJSON('http://api.open-notify.org/iss-now.json?callback=?', function(data) {
        var lat = data['iss_position']['latitude'];
        var lon = data['iss_position']['longitude'];
        
    });
    setTimeout(ISS, 5000); 
}

window.mousePressed = e => Controls.move(controls).mousePressed(e)
window.mouseDragged = e => Controls.move(controls).mouseDragged(e);
window.mouseReleased = e => Controls.move(controls).mouseReleased(e)

//camera controls class borrowed from https://codepen.io/amir-s/pen/jzqZdG?editors=0010

class Controls {
  static move(controls) {
    function mousePressed(e) {
      controls.viewPos.isDragging = true;
      controls.viewPos.prevX = e.clientX;
      controls.viewPos.prevY = e.clientY;
    }

    function mouseDragged(e) {
      const {prevX, prevY, isDragging} = controls.viewPos;
      if(!isDragging) return;

      const pos = {x: e.clientX, y: e.clientY};
      const dx = pos.x - prevX;
      const dy = pos.y - prevY;

      if(prevX || prevY) {
        controls.view.x += dx;
        controls.view.y += dy;
        controls.viewPos.prevX = pos.x, controls.viewPos.prevY = pos.y
      }
    }

    function mouseReleased(e) {
      controls.viewPos.isDragging = false;
      controls.viewPos.prevX = null;
      controls.viewPos.prevY = null;
    }
 
    return {
      mousePressed, 
      mouseDragged, 
      mouseReleased
    }
  }

  static zoom(controls) {
    function worldZoom(e) {
      const {x, y, deltaY} = e;
      const direction = deltaY > 0 ? -1 : 1;
      const factor = 0.05;
      const zoom = 1 * direction * factor;

      const wx = (x-controls.view.x)/(width*controls.view.zoom);
      const wy = (y-controls.view.y)/(height*controls.view.zoom);
      
      controls.view.x -= wx*width*zoom;
      controls.view.y -= wy*height*zoom;
      controls.view.zoom += zoom;
    }

    return {worldZoom}
  }
}
