let canvas = null
const c = canvas.getContext('2d')

resizeCanvas()

const rings = []
const stars = []

class Star {
  constructor (x, y) {
    console.log(x, y)
    this.xSpeed = Math.random()
    this.ySpeed = Math.random()
    this.acceleration = 1.015
    this.x = x
    this.y = y
    this.size = Math.random() * 0.75
    this.xVel = (Math.random() * this.xSpeed) - (this.xSpeed / 2)
    this.yVel = (Math.random() * this.ySpeed) - (this.ySpeed / 2)
  }

  update (ctx) {
    this.x += this.xVel
    this.y += this.yVel
    this.xVel = this.xVel > 0
      ? this.xVel * this.acceleration
      : this.xVel * this.acceleration
    this.yVel = this.yVel > 0
      ? this.yVel * this.acceleration
      : this.yVel * this.acceleration
    this.draw(ctx)
  }

  draw (ctx) {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    ctx.fillStyle = '#fff'
    ctx.fill()
    ctx.closePath()
  }
}

class Ring {
  constructor (x, y, size) {
    this.x = x || canvas.width / 2
    this.y = y || canvas.height / 2
    this.size = size || 5
    this.opacity = 0.25
    this.strokeWidth = 0
    this.color = `hsla(0, 0%, 100%, ${this.opacity})`
    this.growth = 0.1
  }

  update (ctx) {
    if (this.opacity < 1) {
      this.opacity += 0.00001
    }
    if (this.size < canvas.width / 2 || this.size < canvas.height / 2) {
      this.x += 0.15
      this.y += 0.15
    } else {
      this.x -= 0.15
      this.y -= 0.15
    }
    this.strokeWidth += 0.01
    this.size += this.growth
    this.color = `hsla(0, 0%, 100%, ${this.opacity})`
    this.growth += (this.growth ** 2) * 0.025
  }

  draw (ctx) {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    ctx.strokeStyle = this.color
    ctx.lineWidth = this.strokeWidth
    ctx.stroke()
    ctx.closePath()
  }
}

setInterval(() => {
  const x = canvas.width / 2
  const y = canvas.height / 2
  const size = 5
  // const color = 'hsl(0, 0%, 100%)'
  rings.push(new Ring(x, y, size))
}, 500)

setInterval(() => {
  // if (stars.length < 2) {
  addStar()
  // animate(c);
  // }
}, 25)

let brightness = 0

const animate = (ctx) => {
  ctx.fillStyle = `hsla(0, 0%, ${brightness}%, 0.3)`
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  if (brightness > 0) {
    brightness -= 20
  }

  for (const [i, ring] of rings.entries()) {
    ring.update(ctx)
    ring.draw(ctx)
    if (ring.size > canvas.height && ring.size > canvas.width) {
      rings.splice(i, 1)
      flash()
    }
  }

  for (const [i, star] of stars.entries()) {
    star.update(ctx)
    if (star.x > canvas.width ||
      star.x < 0 ||
      star.y > canvas.height ||
      star.y < 0) {
      stars.splice(i, 1)
    }
  }

  requestAnimationFrame(() => animate(ctx))
}

export function init (can) {
  canvas = can
  animate(c)
}

window.addEventListener('resize', resizeCanvas)

function addStar () {
  const x = canvas.width / 2
  const y = canvas.height / 2
  stars.push(new Star(x, y))
}

function flash () {
  brightness = 100
}

function resizeCanvas () {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
}
