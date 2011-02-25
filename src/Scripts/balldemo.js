//
// @file 
// @brief
// @author ongaeshi
// @date   2011/02/03

// -- parametor ----------- 

var RADIUS_MIN = 5;
var RADIUS_MAX = 40;

var SPEEDRATE_BASE = 1.0;
var SPEEDRATE_SMALL = 2.0;
var SPEEDRATE_BIG = 0.5;

var REFLECT_COUNT = 5;

var BALLSPEED_MAX = 200;
var BALLSPEED_INC = 5;

// ----------------------

var ballSpeed = 10;
var bgColor = 'rgb(0, 0, 0);';
var ballContainer = [];

var ballColorTable = [
  '#ff0000',
  '#ff9900',
  '#ffff00',
  '#99ff00',
  '#00ff00',
  '#00ff99',
  '#00ffff',
  '#0099ff',
  '#0000ff',
  '#9900ff',
  '#ff00ff',
  '#ff0099',
];

function Ball() {
    this.initialize.apply(this, arguments);
}
Ball.prototype = {
  initialize: function(pos, radius, speed, color) {
    this.pos = pos;
    this.radius = radius;
    this.speed = speed;
    this.color = color;
    this.reflect_count = 0;
  },

  move: function() {
    var speedRate = MyMath.lerp(SPEEDRATE_SMALL, SPEEDRATE_BIG, MyMath.rate(RADIUS_MIN, RADIUS_MAX, this.radius)) * SPEEDRATE_BASE * (ballSpeed * 0.1);
    
    this.pos.x += this.speed.x * speedRate;
    this.pos.y += this.speed.y * speedRate;

    if (this.reflect_count < REFLECT_COUNT) {
      var canvas = document.getElementById("canvas");

      var reflect = false;

      // left
      if (this.pos.x - this.radius < 0) {
        this.speed.x *= -1.0;
        reflect = true;
      }
      // right
      else if (this.pos.x + this.radius > canvas.width) {
        this.speed.x *= -1.0;
        reflect = true;
      }
      
      // top
      if (this.pos.y - this.radius < 0) {
        this.speed.y *= -1.0;
        reflect = true;
      }
      // bottom
      else if (this.pos.y + this.radius > canvas.height) {
        this.speed.y *= -1.0;
        reflect = true;
      }

      // 反射回数をカウント
      if (reflect) {
        this.reflect_count += 1;
      }
    }
  },

  draw: function() {
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI*2, false);
    ctx.fill();
  }
};

var procAnim = function() {
  setInterval(function () {
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext('2d');
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (var i = 0; i < ballContainer.length; i++) {
      var ball = ballContainer[i];
      ball.move();
    }

    for (var i = 0; i < ballContainer.length; i++) {
      var ball = ballContainer[i];
      ball.draw();
    }
  }, 16);
}

var onclick_lbutton = function() {
  ballSpeed -= BALLSPEED_INC;
  if (ballSpeed < 0)  ballSpeed = 0;
  updateSpeedMetor();
}

var onclick_rbutton = function() {
  ballSpeed += BALLSPEED_INC;
  if (ballSpeed > BALLSPEED_MAX)  ballSpeed = BALLSPEED_MAX;
  updateSpeedMetor();
}

var onchange_text = function(obj) {
  ballSpeed = parseFloat(obj.value) * 10;
  if (ballSpeed < 0)  ballSpeed = 0;
  if (ballSpeed > BALLSPEED_MAX)  ballSpeed = BALLSPEED_MAX;
  updateSpeedMetor();
}

var calcBallSpeed = function () {
  var table = [
    MyMath.deg2rad(0),
    MyMath.deg2rad(45),
    MyMath.deg2rad(90),
    MyMath.deg2rad(135),
    MyMath.deg2rad(180),
    MyMath.deg2rad(225),
    MyMath.deg2rad(270),
    MyMath.deg2rad(315)
  ];

  var rad = table[MyMath.randi(table.length)];
  return {x: Math.cos(rad), y: Math.sin(rad)};
}

var onclick_canvas  = function(ev) {
  var event = fixEvent(ev);
  var pos = {x:event.offsetX, y:event.offsetY};
  var radius = MyMath.randi(RADIUS_MIN, RADIUS_MAX);
  var speed = calcBallSpeed();
  var color = ballColorTable[MyMath.randi(ballColorTable.length)];
  ballContainer.push(new Ball(pos, radius, speed, color));
}

var updateSpeedMetor = function(val) {
  var value = ballSpeed * 0.1;
  document.getElementById("speedmetor").value = eval(value.toFixed(1));
}

addEvent(window, "load", function() {
  // キャンバスに描画
  procAnim();

  // 初期値
  document.getElementById("speedmetor").value = "1.0";

});



