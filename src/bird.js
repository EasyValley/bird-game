import config from './config'
class Bird {
  constructor(ctx, img) {
    this.x = 150
    this.y = 200
    this.img = img
    this.ctx = ctx
    this.frameIndex = 0
    this.speed = 0
    this.accelerate = config.bird.accelerate
    this.waitTime = 0
    this.w = 52
    this.h = 45
  }
  update(dt) {
    this.waitTime = this.waitTime + dt
    if (this.waitTime >= config.bird.waitTime) {
      this.frameIndex += 1
      this.frameIndex = this.frameIndex % 3
      this.waitTime = this.waitTime - config.bird.waitTime
    }
    this.speed = this.speed + this.accelerate * dt
    this.y = this.y + dt * this.speed
  }
  draw(dt) {
    this.update(dt)
    this.ctx.save()
    this.ctx.translate(this.x, this.y)
    let angleSpeed = this.speed
    if (angleSpeed < -config.bird.speed) {
      angleSpeed = -config.bird.speed
    }
    if (angleSpeed > config.bird.speed) {
      angleSpeed = config.bird.speed
    }

    this.ctx.rotate((30 / 180) * Math.PI * (angleSpeed / config.bird.speed))
    this.ctx.drawImage(
      this.img,
      this.w * this.frameIndex,
      0,
      this.w,
      this.h,
      -this.w / 2,
      -this.h / 2,
      this.w,
      this.h
    )

    this.ctx.restore()
  }
}

export default Bird
