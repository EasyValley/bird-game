import config from './config'
function randomRange(start, end) {
  let val = Math.floor(Math.random() * (end - start + 1)) + start
  return val
}
class Pipe {
  constructor(ctx, x, upImg, downImg) {
    this.ctx = ctx
    this.upImg = upImg
    this.downImg = downImg
    this.x = x
    this.h = randomRange(config.pipe.randomStart, config.pipe.randdomEnd)
    this.speed = config.pipe.speed
    this.w = 52
  }
  update(dt) {
    this.x = this.x + this.speed * dt
    if (this.x < -this.w) {
      this.h = randomRange(config.pipe.randomStart, config.pipe.randdomEnd)
      this.x += config.pipe.spaceX * 4
    }
  }
  draw(dt) {
    this.update(dt)
    let height = 420 - this.h
    this.ctx.drawImage(
      this.upImg,
      0,
      this.h,
      this.w,
      height,
      this.x,
      0,
      this.w,
      height
    )

    this.ctx.drawImage(this.downImg, this.x, height + config.pipe.spaceY)
    this.ctx.rect(this.x, 0, this.w, height)
    this.ctx.rect(this.x, height + config.pipe.spaceY, this.w, 420)
  }
}

export default Pipe
