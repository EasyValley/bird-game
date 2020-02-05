import config from './config'
class Sky {
  constructor(ctx, img, x) {
    this.ctx = ctx
    this.img = img
    this.speed = config.sky.speed
    this.x = x
  }
  update(dt) {
    this.x = this.x + this.speed * dt
    if (this.x < -800) {
      this.x = this.x + 800 * 2
    }
  }
  draw(dt) {
    this.update(dt)
    this.ctx.drawImage(this.img, this.x, 0)
  }
}

export default Sky
