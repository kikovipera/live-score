var i;
var c;

function element(n) {
  fill(255, 200, 200 - map(n, 0, 750, 0, 200), 40)
  if (n < 144) {
    ellipse(createDistance(c)(n), 0, 3, 3);
  }
  else {
    var d = createDistance(c)(n);
    rect(d, 0, 15+sqrt(n), 4+sqrt(n));
  }
}

function angle(n) {
  return 2.159844949343 * n;
}

function createDistance(c) {
  var distance = function (n) {
    return c * sqrt(n);
  };
  return distance;
}

function setup() {
  createCanvas(300, 200);
  i = 0;
  c = 2;
}

function draw() {
  i++;
  translate(width / 2. , height / 2.);
  rotate(angle(i));
  stroke(0, 60);
  fill(255, 200, 200);
  if (i< 750) element(i);
}
