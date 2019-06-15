//jshint esversion:6

//canvas
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var stars = [];
var numberOfStars = 500;

function GetRandomColor() {
    var r = 0, g = 0, b = 0, t = 0, temp = 0;

    while (r < 100 && g < 100 && b < 100)
    {
        r = Math.floor(Math.random() * 256);
        g = Math.floor(Math.random() * 256);
        b = Math.floor(Math.random() * 256);
    }

    temp = Math.random();
    t = temp.toFixed(1);

    return "rgba(" + r + "," + r + ","  + r + "," + t + ")";
}

function GetRandomSize() {
  var size = 0;
  var min = 1;
  var max = 3;
  size = Math.floor(Math.random()*(max-min)) + min;
  return size;
}

var Stars = function () {
        this.x = canvas.width * Math.random();
        this.y = canvas.height * Math.random();
        this.vx = 4 * Math.random() - 2;
        this.vy = 4 * Math.random() - 2;
        this.Color = GetRandomColor();
        this.Size = GetRandomSize();
};

Stars.prototype.Draw = function (ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.Size, 0, 2*Math.PI);
    ctx.fillStyle = this.Color;
    ctx.fill();
};

Stars.prototype.Update = function () {
    this.x += this.vx;
    this.y += this.vy;

    if (this.x<0 || this.x > canvas.width)
        this.vx = -this.vx;

    if (this.y < 0 || this.y > canvas.height)
        this.vy = -this.vy;
};

function loop() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < numberOfStars; i++) {
        stars[i].Update();
        stars[i].Draw(ctx);
    }
}

function createStars(){
  for (var i = 0; i < numberOfStars; i++)
      stars.push(new Stars());
}

createStars();

setInterval(function(){
  loop();
}, 30);
