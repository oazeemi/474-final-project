class Point {
  constructor(azimuth, parent) {
    this.parent = parent;
    this.azimuth = Math.PI - azimuth;
    this._components = {
      x: Math.cos(this.azimuth),
      y: Math.sin(this.azimuth)
    };

    this.acceleration = -0.3 + Math.random() * 0.6;
  }

  solveWith(leftPoint, rightPoint) {
    this.acceleration =
      (-0.3 * this.radialEffect +
        (leftPoint.radialEffect - this.radialEffect) +
        (rightPoint.radialEffect - this.radialEffect)) *
        this.elasticity -
      this.speed * this.friction;
  }

  set acceleration(value) {
    if (typeof value == "number") {
      this._acceleration = value;
      this.speed += this._acceleration * 2;
    }
  }
  get acceleration() {
    return this._acceleration || 0;
  }

  set speed(value) {
    if (typeof value == "number") {
      this._speed = value;
      this.radialEffect += this._speed * 5;
    }
  }
  get speed() {
    return this._speed || 0;
  }

  set radialEffect(value) {
    if (typeof value == "number") {
      this._radialEffect = value;
    }
  }
  get radialEffect() {
    return this._radialEffect || 0;
  }

  get position() {
    return {
      x:
        this.parent.center.x +
        this.components.x * (this.parent.radius + this.radialEffect),
      y:
        this.parent.center.y +
        this.components.y * (this.parent.radius + this.radialEffect)
    };
  }

  get components() {
    return this._components;
  }

  set elasticity(value) {
    if (typeof value === "number") {
      this._elasticity = value;
    }
  }
  get elasticity() {
    return this._elasticity || 0.001;
  }
  set friction(value) {
    if (typeof value === "number") {
      this._friction = value;
    }
  }
  get friction() {
    return this._friction || 0.0085;
  }
}

blob = new Blob();

init = function() {
  canvas = document.createElement("canvas");
  canvas.setAttribute("touch-action", "none");

  document.body.appendChild(canvas);

  let resize = function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };
  window.addEventListener("resize", resize);
  resize();

  let oldMousePoint = { x: 0, y: 0 };
  let hover = false;
  let mouseMove = function(e) {
    let pos = blob.center;
    let diff = { x: e.clientX - pos.x, y: e.clientY - pos.y };
    let dist = Math.sqrt(diff.x * diff.x + diff.y * diff.y);
    let angle = null;

    blob.mousePos = { x: pos.x - e.clientX, y: pos.y - e.clientY };

    if (dist < blob.radius && hover === false) {
      let vector = { x: e.clientX - pos.x, y: e.clientY - pos.y };
      angle = Math.atan2(vector.y, vector.x);
      hover = true;
      // blob.color = '#77FF00';
    } else if (dist > blob.radius && hover === true) {
      let vector = { x: e.clientX - pos.x, y: e.clientY - pos.y };
      angle = Math.atan2(vector.y, vector.x);
      hover = false;
      blob.color = null;
    }

    if (typeof angle == "number") {
      let nearestPoint = null;
      let distanceFromPoint = 100;

      blob.points.forEach(point => {
        if (Math.abs(angle - point.azimuth) < distanceFromPoint) {
          // console.log(point.azimuth, angle, distanceFromPoint);
          nearestPoint = point;
          distanceFromPoint = Math.abs(angle - point.azimuth);
        }
      });

      if (nearestPoint) {
        let strength = {
          x: oldMousePoint.x - e.clientX,
          y: oldMousePoint.y - e.clientY
        };
        strength =
          Math.sqrt(strength.x * strength.x + strength.y * strength.y) * 10;
        if (strength > 100) strength = 100;
        nearestPoint.acceleration = (strength / 100) * (hover ? -1 : 1);
      }
    }

    oldMousePoint.x = e.clientX;
    oldMousePoint.y = e.clientY;
  };
  // window.addEventListener('mousemove', mouseMove);
  window.addEventListener("pointermove", mouseMove);

  blob.canvas = canvas;
  blob.init();
  blob.render();
};

init();

class Point {
  constructor(azimuth, parent) {
    this.parent = parent;
    this.azimuth = Math.PI - azimuth;
    this._components = {
      x: Math.cos(this.azimuth),
      y: Math.sin(this.azimuth)
    };

    this.acceleration = -0.3 + Math.random() * 0.6;
  }

  solveWith(leftPoint, rightPoint) {
    this.acceleration =
      (-0.3 * this.radialEffect +
        (leftPoint.radialEffect - this.radialEffect) +
        (rightPoint.radialEffect - this.radialEffect)) *
        this.elasticity -
      this.speed * this.friction;
  }

  set acceleration(value) {
    if (typeof value == "number") {
      this._acceleration = value;
      this.speed += this._acceleration * 2;
    }
  }
  get acceleration() {
    return this._acceleration || 0;
  }

  set speed(value) {
    if (typeof value == "number") {
      this._speed = value;
      this.radialEffect += this._speed * 5;
    }
  }
  get speed() {
    return this._speed || 0;
  }

  set radialEffect(value) {
    if (typeof value == "number") {
      this._radialEffect = value;
    }
  }
  get radialEffect() {
    return this._radialEffect || 0;
  }

  get position() {
    return {
      x:
        this.parent.center.x +
        this.components.x * (this.parent.radius + this.radialEffect),
      y:
        this.parent.center.y +
        this.components.y * (this.parent.radius + this.radialEffect)
    };
  }

  get components() {
    return this._components;
  }

  set elasticity(value) {
    if (typeof value === "number") {
      this._elasticity = value;
    }
  }
  get elasticity() {
    return this._elasticity || 0.001;
  }
  set friction(value) {
    if (typeof value === "number") {
      this._friction = value;
    }
  }
  get friction() {
    return this._friction || 0.0085;
  }
}

blob = new Blob();

init = function() {
  canvas = document.createElement("canvas");
  canvas.setAttribute("touch-action", "none");

  document.body.appendChild(canvas);

  let resize = function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };
  window.addEventListener("resize", resize);
  resize();

  let oldMousePoint = {
    x: 0,
    y: 0
  };
  let hover = false;
  let mouseMove = function(e) {
    let pos = blob.center;
    let diff = {
      x: e.clientX - pos.x,
      y: e.clientY - pos.y
    };
    let dist = Math.sqrt(diff.x * diff.x + diff.y * diff.y);
    let angle = null;

    blob.mousePos = {
      x: pos.x - e.clientX,
      y: pos.y - e.clientY
    };

    if (dist < blob.radius && hover === false) {
      let vector = {
        x: e.clientX - pos.x,
        y: e.clientY - pos.y
      };
      angle = Math.atan2(vector.y, vector.x);
      hover = true;
      // blob.color = '#77FF00';
    } else if (dist > blob.radius && hover === true) {
      let vector = {
        x: e.clientX - pos.x,
        y: e.clientY - pos.y
      };
      angle = Math.atan2(vector.y, vector.x);
      hover = false;
      blob.color = "#40204c";
    }

    if (typeof angle == "number") {
      let nearestPoint = null;
      let distanceFromPoint = 100;

      blob.points.forEach(point => {
        if (Math.abs(angle - point.azimuth) < distanceFromPoint) {
          // console.log(point.azimuth, angle, distanceFromPoint);
          nearestPoint = point;
          distanceFromPoint = Math.abs(angle - point.azimuth);
        }
      });

      if (nearestPoint) {
        let strength = {
          x: oldMousePoint.x - e.clientX,
          y: oldMousePoint.y - e.clientY
        };
        strength =
          Math.sqrt(strength.x * strength.x + strength.y * strength.y) * 10;
        if (strength > 100) strength = 100;
        nearestPoint.acceleration = (strength / 100) * (hover ? -1 : 1);
      }
    }

    oldMousePoint.x = e.clientX;
    oldMousePoint.y = e.clientY;
  };
  // window.addEventListener('mousemove', mouseMove);
  window.addEventListener("pointermove", mouseMove);

  blob.canvas = canvas;
  blob.init();
  blob.render();
};

init();
