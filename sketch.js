if (score1 >= 10 || score2 >= 10) {
    gameState = "end";
  }
}

function keyPressed() {
  if (keyCode === ENTER && gameState === "start") {
    gameState = "play";
  }
}

// Classe Paddle
class Paddle {
  constructor(isLeft) {
    this.w = 10;
    this.h = 80;
    this.y = height / 2 - this.h / 2;
    this.isLeft = isLeft;
    this.x = this.isLeft ? 20 : width - 30;
    this.ySpeed = 0;
    this.speed = 10;
  }

  update() {
    // Movimento do paddle
    if (this.isLeft) {
      if (keyIsDown(87)) {
        // W
        this.move(-1);
      } else if (keyIsDown(83)) {
        // S
        this.move(1);
      }
    } else {
      if (keyIsDown(UP_ARROW)) {
        this.move(-1);
      } else if (keyIsDown(DOWN_ARROW)) {
        this.move(1);
      }
    }

    // Limite do paddle
    this.y = constrain(this.y, 0, height - this.h);
  }

  move(direction) {
    this.y += this.speed * direction;
  }

  show() {
    fill(255);
    noStroke();
    rect(this.x, this.y, this.w, this.h);
  }
}

// Classe Ball
class Ball {
  constructor() {
    this.x = width / 2;
    this.y = height / 2;
    this.radius = 12;
    this.xSpeed = random(3, 5) * (random() > 0.5 ? 1 : -1);
    this.ySpeed = random(2, 4) * (random() > 0.5 ? 1 : -1);
  }

  update() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;
  }

  show() {
    fill(255);
    noStroke();
    ellipse(this.x, this.y, this.radius * 2);
  }

  checkPaddleCollision(paddle) {
    if (
      this.x - this.radius < paddle.x + paddle.w &&
      this.x + this.radius > paddle.x &&
      this.y - this.radius < paddle.y + paddle.h &&
      this.y + this.radius > paddle.y
    ) {
      this.xSpeed *= -1.1; // Aumenta a velocidade da bola
      this.ySpeed *= 1.1;
    }
  }

  checkEdges() {
    if (this.y - this.radius < 0 || this.y + this.radius > height) {
      this.ySpeed *= -1;
    }

    if (this.x - this.radius < 0) {
      score2++;
      this.reset();
    }

    if (this.x + this.radius > width) {
      score1++;
      this.reset();
    }
  }

  reset() {
    this.x = width / 2;
    this.y = height / 2;
    this.xSpeed = random(3, 5) * (random() > 0.5 ? 1 : -1);
    this.ySpeed = random(2, 4) * (random() > 0.5 ? 1 : -1);
  }
}
