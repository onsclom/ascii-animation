let pElement = document.getElementById("content");

let grid = []
let x_size = 20*2
let y_size = 10*2
let time = 0
let brightness = " .:-=+*#%@"

//initialize grid
for (let y=0; y<y_size; y++) {
  let cur = ""
  for (let x=0; x<x_size; x++) {
    cur += '`'
  }
  grid.push(cur)
}

function update(progress) {
  time += progress

  //calculate new values
  for (let y=0; y<y_size; y++) {
    cur = ""
    for (let x=0; x<x_size; x++) {
      cur += calculateChar(x,y,time)
    }
    grid[y] = cur
  }
}

function calculateChar(x,y,time) {
  let val = Math.sin(x/5+Math.sin(x**3+y/4-time/500)+time/1000)/2.0+.5
  //output will be 0 to 1
  for (let b=1;b<=brightness.length;b++) {
    if (val <= (1/brightness.length)*b) {
      return brightness[b-1]
    }
  }
  return brightness[brightness.length]-1 
}

function draw() {
  pElement.innerHTML = "";
  
  for (let line of grid) {
    pElement.innerHTML += line+"<br>"
  }
}

function loop(timestamp) {
  var progress = timestamp - lastRender

  update(progress)
  draw()

  lastRender = timestamp
  window.requestAnimationFrame(loop)
}

var lastRender = 0
window.requestAnimationFrame(loop)